require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/tracking'));

// Servir archivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
});

// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

// WebSocket
const wss = new WebSocket.Server({ server });
const clients = new Map();

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'register') {
            clients.set(data.deviceId, ws);
        }
    });
});

// Para uso en otras partes
module.exports = { wss, clients };