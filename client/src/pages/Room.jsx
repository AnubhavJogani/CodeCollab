import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useLocation } from "react-router-dom";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";

const colors = [
  "#f87171", // red-400
  "#60a5fa", // blue-400
  "#34d399", // green-400
  "#fbbf24", // yellow-400
  "#a78bfa", // purple-400
  "#fb7185", // pink-400
  "#38bdf8", // cyan-400
];

const Room = () => {
  const { roomId } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([{ user: "system", text: "Welcome to the room 🚀" }]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const providerRef = useRef(null);
  const ydocRef = useRef(null);
  const bindingRef = useRef(null);
  const yMessagesRef = useRef(null);
  const decorationsRef = useRef([]);
  const displayName = location.state?.displayName || "Anonymous";

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleEditorMount = (editor, monaco) => {
    // 1) Yjs doc + provider
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", roomId, ydoc);
    providerRef.current = provider;
    ydocRef.current = ydoc;

    const localColor = getRandomColor();
    provider.awareness.setLocalStateField("user", {
      name: displayName,
      color: localColor,
    });

    // 2) Shared text + Monaco binding
    const yText = ydoc.getText("monaco");
    const binding = new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
    bindingRef.current = binding;

    // 3) Shared messages
    const yMessages = ydoc.getArray("messages");
    yMessagesRef.current = yMessages;
    yMessages.observe(() => setMessages(yMessages.toArray()));

    // 4) Broadcast local selection/caret to awareness (also once on mount)
    const publishSelection = () => {
      const sel = editor.getSelection();
      if (!sel) return;
      provider.awareness.setLocalStateField("cursor", {
        startLineNumber: sel.startLineNumber,
        startColumn: sel.startColumn,
        endLineNumber: sel.endLineNumber,
        endColumn: sel.endColumn,
      });
    };
    publishSelection(); // send initial caret once
    editor.onDidChangeCursorSelection(publishSelection);

    // 5) Render remote cursors/selections
    const renderCursors = (states) => {
      const me = providerRef.current?.awareness.getLocalState()?.user;
      const next = [];

      states.forEach((s) => {
        if (!s?.user || s.user?.name === me?.name) return;
        if (!s?.cursor) return;

        const { startLineNumber, startColumn, endLineNumber, endColumn } = s.cursor;
        const userColor = s.user.color || "#22c55e"; // fallback green

        // Highlight selection
        const hasRange =
          startLineNumber !== endLineNumber || startColumn !== endColumn;
        if (hasRange) {
          next.push({
            range: new monaco.Range(
              startLineNumber,
              startColumn,
              endLineNumber,
              endColumn
            ),
            options: {
              inlineClassName: `remote-selection-highlight-${s.user.name}`,
            },
          });
        }
        next.push({
          range: new monaco.Range(endLineNumber, endColumn, endLineNumber, endColumn),
          options: {
            className: `remote-caret-${s.user.name}`,
            after: {
              contentText: ` ${s.user.name} `,
              inlineClassName: `remote-cursor-label-${s.user.name}`,
            },
          },
        });

        injectUserStyles(s.user.name, userColor);
      });

      decorationsRef.current = editor.deltaDecorations(
        decorationsRef.current,
        next
      );
    };

    provider.awareness.on("update", () => {
      const states = Array.from(provider.awareness.getStates().values());
      setUsers(states);
      renderCursors(states);
    });
  };

  useEffect(() => {
    return () => {
      if (bindingRef.current) bindingRef.current.destroy();
      if (providerRef.current) providerRef.current.destroy();
      if (ydocRef.current) ydocRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  function injectUserStyles(username, color) {
    const styleId = `cursor-style-${username}`;
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
    .monaco-editor .remote-caret-${username} {
      border-left: 3px solid ${color};  /* thicker caret */
      margin-left: -1px;
    }
    .monaco-editor .remote-cursor-label-${username} {
      background: ${color};
      color: black;
      font-size: 11px;
      padding: 2px 5px;
      border-radius: 4px;
      margin-left: 2px;
      font-weight: 500;
    }
    .monaco-editor .remote-selection-highlight-${username} {
      background-color: ${color}40; /* same color, 25% opacity */
      border-radius: 2px;
    }
  `;
    document.head.appendChild(style);
  }


  const handleCopyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Room Link copied');
  }
  const handleLeaveRoom = () => {
    navigate("/");
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const currentUser = providerRef.current?.awareness.getLocalState()?.user;
    yMessagesRef.current?.push([{
      user: currentUser?.name || "Anonymous",
      color: currentUser?.color || "white",
      text: inputMessage
    }]);
    setInputMessage("");
  };
  const handleRunCode = () => {
    toast.info("Code execution not implemented yet")
  }


  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white">
      <ToastContainer />
      {/* Navbar */}
      <div className="h-12 flex items-center justify-between border-b border-green-500 px-4">
        <div className="font-bold text-green-400">CodeCollab</div>
        <div className="text-sm text-gray-300">Room: {roomId}</div>
        <div className="flex gap-3">
          <button className="px-3 py-1 rounded bg-green-500 text-black hover:bg-green-400" onClick={handleCopyRoomLink}>
            Copy Link
          </button>
          <button className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400" onClick={handleLeaveRoom}>
            Leave
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-48 border-r border-green-500 p-2">
          <h2 className="text-green-400 font-semibold mb-2">Online Users</h2>
          <ul className="text-sm text-gray-300">
            {users.map((u, i) => (
              <li key={i} style={{ color: u.user?.color || "white" }}>
                {u.user?.name || `User ${i + 1}`}
              </li>
            ))}
          </ul>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="javascript"
            onMount={handleEditorMount} // bind Yjs here
          />
        </div>

        {/* Right Sidebar (Chat/Users) */}
        <div className="w-64 border-l border-green-500 p-2 flex flex-col">
          <h2 className="text-green-400 font-semibold mb-2">Chat</h2>
          <div id="chat-box" className="flex-1 bg-gray-900 rounded p-2 overflow-y-auto max-h-[450px]">
            {messages.map((data, i) => (
              <p key={i} className="text-sm" style={{ color: data.color || "white" }}>
                {data.user}: {data.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type message..."
            className="mt-2 mb-2 p-1 rounded bg-black border border-green-500 text-sm"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-3 py-1 rounded bg-green-500 text-black hover:bg-green-400"
          >
            Send
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-10 flex items-center justify-between border-t border-green-500 px-4 text-sm text-gray-300">
        <select className="bg-black border border-green-500 rounded px-2 py-1">
          <option>JavaScript</option>
          <option>Python</option>
          <option>C++</option>
        </select>
        <button className="px-3 py-1 rounded bg-green-500 text-black hover:bg-green-400" onClick={handleRunCode}>
          Run ▶
        </button>
      </div>
    </div>
  );
};

export default Room;
