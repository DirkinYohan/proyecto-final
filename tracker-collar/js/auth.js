document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            deviceId: document.getElementById('deviceId').value,
            password: document.getElementById('password').value
        })
    });
    
    const data = await response.json();
    
    if (data.success) {
        window.location.href = '/tracking.html';
    } else {
        alert('Credenciales incorrectas');
    }
});