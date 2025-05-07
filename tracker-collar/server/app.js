const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const http = require('http'); // Agregamos esto

const app = express();
const PORT = process.env.PORT || 8081;

// Configuración importante
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

// Ruta principal que sirve tu HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/tracking.html', (req, res) => {
    if (req.query.auth !== 'true') {  // Verificación más estricta
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../tracking.html'));
});

// Creamos servidor HTTP para WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Manejador de conexiones WebSocket
const clients = new Map();
wss.on('connection', (ws) => {
    const id = Date.now();
    clients.set(id, ws);
    
    ws.on('close', () => {
        clients.delete(id);
    });
});

// Iniciamos el servidor
server.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

module.exports = { app, server, clients };