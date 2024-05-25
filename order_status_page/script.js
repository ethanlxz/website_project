function trackPackage() {
    var trackingNumber = document.getElementById('trackingNumber').value;

    if (trackingNumber.trim() === "") {
        alert("Please enter a tracking number.");
        return;
    }

    // Simulating tracking information retrieval - Replace this with actual tracking API call
    var trackingInfo = {
        trackingNumber: trackingNumber,
        status: 'In transit',
        location: 'MMU, Cyberjaya',
        latitude: 2.9276384,
        longitude: 101.6420577,
        estimatedDelivery: '2024-07-12'
    };

    displayTrackingInfo(trackingInfo);
    displayMap(trackingInfo.latitude, trackingInfo.longitude);
}

function displayTrackingInfo(info) {
    var trackingInfoDiv = document.getElementById('trackingInfo');
    trackingInfoDiv.innerHTML = `
        <p><strong>Tracking Number:</strong> ${info.trackingNumber}</p>
        <p><strong>Status:</strong> ${info.status}</p>
        <p><strong>Location:</strong> ${info.location}</p>
        <p><strong>Estimated Delivery:</strong> ${info.estimatedDelivery}</p>
    `;
}

function displayMap(latitude, longitude) {
    var mapFrame = document.getElementById('map');
    var mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;
    mapFrame.src = mapUrl;
    mapFrame.style.display = 'block';
}

function refreshPage() {
    document.getElementById('trackingNumber').value = "";
    document.getElementById('trackingInfo').innerHTML = "";
    var mapFrame = document.getElementById('map');
    mapFrame.style.display = 'none';
    mapFrame.src = "";
}
