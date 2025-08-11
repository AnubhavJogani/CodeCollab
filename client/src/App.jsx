import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as monaco from "monaco-editor";
import { io } from "socket.io-client";
import Home from "./pages/Home";
import Room from "./pages/Room";

const socket = io("http://localhost:5000");

function App() {
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);
  const [roomId] = useState("default-room");

  // useEffect(() => {
  //   const editor = monaco.editor.create(editorContainerRef.current, {
  //     value: "// Start coding!",
  //     language: "javascript",
  //     theme: "vs-dark",
  //     automaticLayout: true,
  //   });

  //   editorRef.current = editor;

  //   socket.emit("join-room", roomId);

  //   editor.onDidChangeModelContent(() => {
  //     const code = editor.getValue();
  //     socket.emit("code-change", { roomId, code });
  //   });

  //   socket.on("code-update", (newCode) => {
  //     if (editor.getValue() !== newCode) {
  //       editor.setValue(newCode);
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //     editor.dispose();
  //   };
  // }, [roomId]);

  return (
    // <div>
    //   <h1 style={{ color: "white", textAlign: "center" }}>CodeCollab</h1>
    //   <div
    //     ref={editorContainerRef}
    //     style={{ height: "80vh", margin: "20px", border: "1px solid #333" }}
    //   ></div>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="*" element={<h1 className="flex h-screen w-screen items-center justify-center text-primary text-4xl lg:text-8xl p-4">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
