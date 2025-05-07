let map;
let marker;
let socket;

function initMap() {
    // Mapa centrado en una ubicación inicial (se actualizará con datos reales)
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.200825, lng: -77.280979 },
        zoom: 15
    });

    // Marcador para el collar
    marker = new google.maps.Marker({
        map: map,
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
    });

    // Conectar WebSocket para actualizaciones en tiempo real
    setupWebSocket();
}

function setupWebSocket() {
    socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'location') {
            const pos = { lat: data.lat, lng: data.lng };
            marker.setPosition(pos);
            map.panTo(pos);
        }
    };
}

// Inicializar el mapa cuando se cargue la API de Google
window.initMap = initMap;