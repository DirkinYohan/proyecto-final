let geofencePolygon = null;

document.getElementById('btnGeofence').addEventListener('click', () => {
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: {
            editable: true,
            strokeColor: '#FF0000',
            fillColor: '#FF0000',
            fillOpacity: 0.3
        }
    });

    drawingManager.setMap(map);

    // Evento cuando se completa el dibujo
    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        drawingManager.setMap(null);
        geofencePolygon = polygon;
        alert('Zona de seguridad configurada');
    });
});

// Verificar si el marcador está dentro del polígono (se llama desde tracking.js)
function checkGeofence(position) {
    if (!geofencePolygon) return;

    const isInside = google.maps.geometry.poly.containsLocation(
        new google.maps.LatLng(position.lat, position.lng),
        geofencePolygon
    );

    if (!isInside) {
        document.getElementById('alerts').innerHTML = 
            '<div class="alert">ALERTA: El collar ha salido de la zona segura!</div>';
    }
}