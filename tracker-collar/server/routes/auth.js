const express = require('express');
const router = express.Router();

// Credenciales válidas
const VALID_CREDENTIALS = {
    deviceId: "collar1",
    password: "1234567"
};

router.post('/login', (req, res) => {
    const { deviceId, password } = req.body;
    
    if (deviceId === VALID_CREDENTIALS.deviceId && 
        password === VALID_CREDENTIALS.password) {
        res.json({ success: true, token: "simple-token" });
    } else {
        res.status(401).json({ success: false });
    }
});

module.exports = router;