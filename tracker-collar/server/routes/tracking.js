const express = require('express');
const router = express.Router();
const { clients } = require('../app');

router.post('/update', (req, res) => {
    const { deviceId, lat, lng } = req.body;

    // Enviar actualización a todos los clientes conectados via WebSocket
    clients.forEach((ws) => {
        ws.send(JSON.stringify({
            type: 'location',
            deviceId,
            lat,
            lng,
            timestamp: Date.now()
        }));
    });

    res.send({ success: true });
});

module.exports = router;