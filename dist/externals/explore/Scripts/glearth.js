function glEarth() {
    var earth;

    function initialize() {

        var options = {
         //   sky: true,
            atmosphere: true,
            dragging: true,
            tilting: true,
            zooming: true,
            center: [46.8011, 8.2266],
            zoom: 3
        };
        earth = new WE.map('earth_div', options);

        // WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
        WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
            subdomains: '1234',
            attribution: 'Tiles Courtesy of MapQuest'
        }).addTo(earth);
        
        var toner = WE.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
            opacity: 0.3
        });
        toner.addTo(earth);
    }

    initialize();

    return earth;
}

