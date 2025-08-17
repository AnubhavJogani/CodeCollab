const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { setupWSConnection } = require("y-websocket/bin/utils");

const app = express();

app.get("/", (req, res) => {
    res.send("Yjs WebSocket server is running 🚀");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
    setupWSConnection(ws, req);
});

const PORT = 1234;
server.listen(PORT, () => {
    console.log(`🚀 Express + Yjs WebSocket server running at http://localhost:${PORT}`);
});
