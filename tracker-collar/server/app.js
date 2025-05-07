const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const http = require('http');

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
    if (req.query.auth !== 'true') {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../tracking.html'));
});

// Endpoint para recibir ubicaciones (NUEVO)
app.post('/api/update-location', (req, res) => {
    const { deviceId, lat, lng, authCode } = req.body;
    
    // 1. Validación básica
    if (authCode !== "1234567" || deviceId !== "collar1") {
        return res.status(403).json({ error: "Acceso no autorizado" });
    }

    // 2. Transmite a todos los clientes WebSocket
    broadcastLocation({ deviceId, lat, lng });

    // 3. Respuesta exitosa
    res.json({ 
        success: true,
        message: "Ubicación actualizada",
        timestamp: Date.now()
    });
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

    // Mensaje de bienvenida
    ws.send(JSON.stringify({
        type: "CONNECTION_ESTABLISHED",
        message: "Conexión WebSocket activa"
    }));
});

// Función para transmitir ubicaciones (NUEVA)
function broadcastLocation(data) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "LOCATION_UPDATE",
                deviceId: data.deviceId,
                lat: data.lat,
                lng: data.lng,
                timestamp: Date.now(),
                accuracy: data.accuracy || null
            }));
        }
    });
}

// Iniciamos el servidor
server.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
    console.log(`WebSocket listo en ws://localhost:${PORT}`);
});

module.exports = { 
    app, 
    server, 
    clients,
    broadcastLocation // Exportamos para uso externo si es necesario
};