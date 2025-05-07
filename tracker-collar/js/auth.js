document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const deviceId = document.getElementById('deviceId').value;
    const password = document.getElementById('password').value;

    // Validación básica - CAMBIA ESTO POR TU LÓGICA REAL
    if (deviceId === "collar1" && password === "1234567") {
        // Redirige con parámetro de autenticación
        window.location.href = '/tracking.html?auth=true';
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
});