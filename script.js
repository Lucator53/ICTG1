var map = L.map('map', {
    zoom: 19,
    center: [14.25654,121.40538],
    minZoom: 17.5,
    doubleClickZoom: false,
    // maxBounds: [
    //     [14.2588,121.4118],  // Northeast
    //     [14.2512,121.4000], // Southwest
    // ],
});

const hotLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
                zoom: 18,
                maxZoom: 21,
                minZoom: 16.5,
                attribution: "Tiles courtesy of HOT",
                // bounds: [
                //     [14.2512, 121.4000], // Southwest
                //     [14.2588, 121.4118]  // Northeast
                // ]
                }).addTo(map);

var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                zoom:18,
                maxZoom:19,
                bounds: [
                    [14.2512, 121.4000], // Southwest
                    [14.2588, 121.4118]  // Northeast
                ],
                attribution: "© OpenStreetMap Contributors"
                }).addTo(map);

var esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                zoom: 18,
                maxZoom: 18,
                bounds: [
                    [14.2512, 121.4000], // Southwest
                    [14.2588, 121.4118]  // Northeast
                ],
                attribution: 'Tiles &copy; Esri'   
                }).addTo(map);

var baseLayers = {
    "OpenStreetMap": osmLayer,
    "Humanitarian": hotLayer,
    "Esri Satellite": esriSatellite
};

L.control.layers(baseLayers, null, {position: 'bottomright'}).addTo(map);

L.control.locate({
    position: 'bottomright',
    icon: 'fa fa-location-arrow',
    drawCircle: false,
    drawMarker: true,
    showPopup: true
}).addTo(map);
map.zoomControl.setPosition('bottomright');

var userLocationMarker;
    var draggableMarker;
    var routingControl;

    map.on('locationfound', function (e) {
        var userLocation = e.latlng;

        if (!userLocationMarker) {
            userLocationMarker = L.marker(userLocation, {
                icon: L.icon({
                    iconUrl: 'src/meoffices.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                })
            }).addTo(map);
        } else {
            userLocationMarker.setLatLng(userLocation);
        }

        if (!draggableMarker) {
            draggableMarker = L.marker(userLocation, {
                draggable: true
            }).addTo(map);
            
            draggableMarker.on('dragend', function(e) {
                updateRoutingWaypoints();
            });
        } else {
            draggableMarker.setLatLng(userLocation);
        }
        
        updateRoutingWaypoints();
    });

    function updateRoutingWaypoints() {
        if (routingControl) {
            var waypoints = [
                userLocationMarker.getLatLng(), 
                draggableMarker.getLatLng()
            ];
            
            routingControl.setWaypoints(waypoints);
        } else {
            routingControl = L.Routing.control({
                waypoints: [
                    userLocationMarker.getLatLng(), 
                    draggableMarker.getLatLng() 
                ],
                routeWhileDragging: false,
                show: true,
                GamepadButton: true,
                fitSelectedRoutes: false 
            }).addTo(map);
        }
    }

    function removeRoutingControl() {
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
        
        if (userLocationMarker) {
            map.removeLayer(userLocationMarker);
            userLocationMarker = null;
        }
        
        if (draggableMarker) {
            map.removeLayer(draggableMarker);
            draggableMarker = null;
        }
    }

    var removeRoutingButton = L.control({position: 'bottomright'});
    removeRoutingButton.onAdd = function () {
        var div = L.DomUtil.create('div', 'remove-routing-button');
        div.innerHTML = `
        <style>
            #bul:hover{
                background-color:#929493;
                cursor:pointer;    
            }
        </style>
        <button id="bul" style="font-weight:bolder; width: 33px; background-color:white; border: solid rgba(74, 74, 74, 0.20) 1px; border-radius:10%; box-shadow: #949494 0.1px 0.1px 0.1px 1px;" onclick="removeRoutingControl()"><i class="fa-solid fa-xmark"></i></button>
        `;
        return div;
    };
    removeRoutingButton.addTo(map);


var allMarkers = [];
var allLabels = [];

//! Custom Marker
function CustomMarker(map, latlng, iconUrl, popupSrc, iconSize, label, iconAnchor) {

    var customMarkerIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize
    });
    var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);

    var iframe = document.createElement('iframe');
        iframe.src = popupSrc;
        iframe.className = 'tae';
        iframe.frameBorder = 0;
    
    var popupContent = L.popup({
        offset: [0, 1],
        maxWidth: "400px" 
    }).setContent(iframe);
    
    customMarker.bindPopup(popupContent);

    var labelIcon = L.divIcon({
        className: 'custom-marker-label',
        iconAnchor: iconAnchor, 
        html: label 
    });

    L.marker(latlng, { icon: labelIcon }).addTo(map);
}


CustomMarker(
    map,
    [14.25545, 121.40073], // Gate 1
    'src/entrance.png',
    "info/gate1.html",
    [50, 30],
    ""
);

CustomMarker(
    map,
    [14.25626, 121.40779], // Gate 2
    'src/exit.png',
    "info/gate2.html",
    [50, 30],
    ""
);

CustomMarker(
    map,
    [14.25571,121.40581], // Jose Rizal Monument
    'src/RizalMon.png',
    "info/rizal.html",
    [30, 30],
    '',
    [50,-20]
);

//!

//* SHS ROOMS

function SHSMarker(map, latlng, popupSrc, label) {

    var customMarkerIcon = L.icon({
        iconUrl: 'src/shs.png',
        iconSize: [20,20],
    });
    var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
    
    var iframe = document.createElement('iframe');
        iframe.src = popupSrc;
        iframe.className = 'tae';
        iframe.frameBorder = 0;

    var popupContent = L.popup({
        offset: [0, 1],
        maxWidth: "400px" 
    }).setContent(iframe);
    
    customMarker.bindPopup(popupContent);

    var labelIcon = L.divIcon({
        className: 'custom-marker-label',
        iconAnchor:[10, -10], 
        html: label 
    });

    var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);
    
    labelicon.isSHSL = true;
    customMarker.isSHS = true;
    labelicon.isBL = true;
    customMarker.isB = true;



    allMarkers.push(customMarker);
    allLabels.push(labelicon);
}

//! SHS ROOMS
SHSMarker(
    map,
    [14.25674,121.40529], //LU 01
    'info/lu01.html',
    "LU 01"
)
SHSMarker(
    map,
    [14.25666,121.40532], //LU 02
    'info/lu02.html',
    "LU 02"
)
SHSMarker(
    map,
    [14.25660,121.40535], //LU 03
    'info/lu03.html',
    "LU 03"
)
SHSMarker(
    map,
    [14.25648,121.40540], //LU 04
    'info/lu04.html',
    "LU 04"
)

SHSMarker(
    map,
    [14.25639,121.40544], //LU 05
    'info/lu05.html',
    "LU 05"
)

SHSMarker(
    map,
    [14.25630,121.40548], //LU 06
    'info/lu06.html',
    "LU 06"
)

SHSMarker(
    map,
    [14.25606,121.40571], //LU 08
    'info/lu08.html',
    "LU 08"
)

SHSMarker(
    map,
    [14.25631,121.40561], //LU 10
    'info/lu10.html',
    "LU 10"
)

SHSMarker(
    map,
    [14.25644,121.40554], //LU 12
    'info/lu12.html',
    "LU 12"
)

SHSMarker(
    map,
    [14.25670,121.40544], //LU 15
    'info/lu15.html',
    "LU 15"
)

//LU Buildings
function lublg(map, latlng, popupSrc, iconUrl, iconSize, label, iconAnchor) {

    
    var customMarkerIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize
    });
    var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
    
  var iframe = document.createElement('iframe');
        iframe.src = popupSrc;
        iframe.className = 'tae';
        iframe.frameBorder = 0;
    
    var popupContent = L.popup({
        offset: [0, 1],
        maxWidth: "400px" 
    }).setContent(iframe);
    
    customMarker.bindPopup(popupContent);

    var labelIcon = L.divIcon({
        className: 'custom-marker-label',
        iconAnchor: iconAnchor, 
        html: label 
    });

    var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);
    
    labelicon.isBL = true;
    customMarker.isB = true;


    allMarkers.push(customMarker);
    allLabels.push(labelicon);
}

//! LU Buildings

lublg(
    map,
    [14.25490,121.40754], // Athlete's Village
    'info/av.html',
    'src/AV.png',
    [30,30],
    "Athletes' Village",
    [38,-20]
);

lublg(
    map,
    [14.25564,121.40778], // Oreta Building
    'info/oreta.html',
    'src/oreta.png',
    [30,30],
    'Oreta Building',
    [35,-20]
);

lublg(
    map,
    [14.25426,121.40904], // New Building
    'info/nb.html',
    'src/NB.png',
    [30,30],
    "New Building",
    [30,-20]
);

lublg(
    map,
    [14.25450,121.40977], //Admin Building
    'info/admin.html',
    'src/admin.png',
    [30,30],
    "Under Construction",
    [45,-20]
)

lublg(
    map,
    [14.25510,121.40691], //Chem Lab
    'info/1chem.html',
    'src/chem.png',
    [20,20],
    "",
    [30,-12],
)

lublg(
    map,
    [14.25512,121.40697], //Bio Lab
    'info/1bio.html',
    'src/bio.png',
    [20,20],
    "",
    [20,-12],
)

lublg(
    map,
    [14.25514,121.40703], //Physics Lab
    'info/1physics.html',
    'src/physics.png',
    [20,20],
    "",
    [30,-12],
    )
    
lublg(
    map,
    [14.25506,121.40684], // M.E Offices
    'info/1meoffice.html',
    'src/meoffices.png',
    [25, 25],
    "M.E Offices",
    [25,-12],
);

lublg(
    map,
    [14.25498,121.40665], // Engineering
    'info/1auto.html',
    'src/eng.png',
    [25, 25],
    "Automotive",
    [30,-12],
);

lublg(
    map,
    [14.25491,121.40685], // Engineering (1)
    'info/1machine.html',
    'src/gear.png',
    [25, 25],
    `Machine Shop`,
    [30,-12],
);



//TODO ADMIN OFFICE

function office(map, iconUrl, latlng, popupSrc, label){

        var customMarkerIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [20,20],
        });
        var customMarker = L.marker(latlng, {icon: customMarkerIcon}).addTo(map);
        
        var iframe = document.createElement('iframe');
        iframe.src = popupSrc;
        iframe.className = 'tae';
        iframe.frameBorder = 0;
        
        var popupContent = L.popup({
            offset: [0, 1],
            maxWidth: "400px" 
        }).setContent(iframe);
        
        customMarker.bindPopup(popupContent);
    
        var labelIcon = L.divIcon({
            className: 'label1',
            iconAnchor:[30, -15], 
            html: label
        });
    
       var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);

        customMarker.isO = true;
        labelicon.isOL = true;
        labelicon.isBL = true;
        customMarker.isB = true;


        allLabels.push(labelicon)
        allMarkers.push(customMarker);
    }
//ADMIN BLDG OFFICES


office(
    map,
    'src/chs.png',
    [14.25619,121.40553], //CHS
    'info/lu07.html',
    "<i>CHS Laboratory</i>"
)

office(
    map,
    'src/faculty.png',
    [14.25618,121.40565], //SHS Faculty
    'info/lu09.html',
    "<i>SHS Faculty Room</i>"
)

office(
    map,
    'src/clinic.png',
    [14.25675,121.40542], //Clinic
    'info/lu16.html',
    "<i>University Clinic</i>"
)

office(
    map,
    'src/lu11.png',
    [14.25638,121.40559], //Records Office
    'info/lu11.html',
    "<i>Records Office</i>"
)

office(
    map,
    'src/registrar.png',
    [14.25658,121.40549], //Registrar
    'info/lu13.html',
    "<i>Registrar's Office</i>"
)

office(
    map,
    'src/research-center.png',
    [14.25686,121.40537], //Research Center
    'info/lu17.html',
    "<i>Research Center</i>"
)

office(
    map,
    'src/hrmo2.png',
    [14.25692,121.40534], //HRMO
    'info/lu18.html',
    "<i>HRMO</i>"
)

office(
    map,
    'src/cashier.png',
    [14.25699,121.40531], //Cashier
    'info/lu19.html',
    "<i>Cashier's Office</i>"
)

office(
    map,
    'src/adminof.png',
    [14.25705,121.40529], //Admin Office
    'info/lu20.html',
    "<i>Admin Office</i>"
)

//? COMPLEX
    function complex(map, latlng, iconUrl, html, iconSize, label, iconAnchor) {

        var customMarkerIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: iconSize
        });
        var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
        
        var iframe = document.createElement('iframe');
        iframe.src = html;
        iframe.className = 'tae';
        iframe.frameBorder = 0;
        
        var popupContent = L.popup({
            offset: [0, 1],
            maxWidth: "400px" 
        }).setContent(iframe);
        
        customMarker.bindPopup(popupContent);
    
        var labelIcon = L.divIcon({
            className: 'complex',
            iconAnchor: iconAnchor, 
            html: label 
        });
    
        var labelicon = L.marker(latlng, { icon: labelIcon }).addTo(map);

        customMarker.isC = true;

        allLabels.push(labelicon)
        allMarkers.push(customMarker);
    }
//! COMPLEX 
    complex(
        map,
        [14.25523,121.40620], // San Luis Gym
        'src/sanluis.png',
        'info/sanluis.html',
        [30,30],
        "San Luis Gym",
        [30,-20]
    );
    
    complex(
        map,
        [14.25467,121.40630], // MP
        'src/MP.png',
        'info/mp.html',
        [30,30],
        "Multi-Purpose Gym",
        [38,-20]
    );

    complex(
        map,
        [14.25547,121.40677], // Pool
        'src/swimming.png',
        'info/pool.html',
        [30,30],
        `Pool Area`,
        [23,-20]
        
    )

    complex(
        map, 
        [14.25605,121.40601], //Canteen
        'src/canteen.png',
        'info/canteen.html',
        [30,30],
        "Canteen",
        [20,-20]
    )

var crPopupContent = "Comfort Room";

    //* CR
    function CR(map, latlng, iconUrl) {
    
        var customMarkerIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [20,20],
        });
        var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
    
        customMarker.isCr = true;
    
        if (crPopupContent) {
            customMarker.bindPopup(crPopupContent);
        }
    
        allMarkers.push(customMarker);
    }
    CR(
        map,
        [14.25597,121.40622],
        'src/cr.png'
    )
    CR(
        map,
        [14.25568,121.40759],
        'src/female.png'
    )
    CR(
        map,
        [14.25550,121.40768],
        'src/male.png'
    )
    CR(
        map,
        [14.25550,121.40768],
        'src/male.png'
    )
    CR(
        map,
        [14.25501,121.40679],
        'src/cr.png'
    )
    CR(
        map,
        [14.25650,121.40557],
        'src/cr.png'
    )
    CR(
        map,
        [14.25668,121.40548],
        'src/cr.png'
    )
    CR(
        map,
        [14.25551,121.40696],
        'src/female.png'
    )
    CR(
        map,
        [14.25539,121.40701],
        'src/male.png'
    )
    CR(
        map,
        [14.25559,121.40655],
        'src/cr.png'
    )
   
    CR(
        map,
        [14.25620,121.40785],
        'src/cr.png'
    )
 
    CR(
        map,
        [14.25437,121.40592],
        'src/cr.png'
    )
   
    var parPopupContent = "Parking";
    
        //* Parking
        function Park(map, latlng) {
        
            var customMarkerIcon = L.icon({
                iconUrl:'src/pk.png',
                iconSize: [20,20],
            });
            var customMarker = L.marker(latlng, { icon: customMarkerIcon }).addTo(map);
        
            customMarker.isPk = true;
        
            if (parPopupContent) {
                customMarker.bindPopup(parPopupContent);
            }
        
            allMarkers.push(customMarker);
        }

        Park(
            map,
            [14.25546,121.40780],
             
        )
        Park(
            map,
            [14.25519,121.40787],
             
        )
        Park(
            map,
            [14.25465,121.40888],
             
        )
        Park(
            map,
            [14.25460,121.40858],
             
        )
        Park(
            map,
            [14.25536,121.40652],
             
        )
        Park(
            map,
            [14.25703,121.40516],
             
        )
        Park(
            map,
            [14.25648,121.40527],
             
        )
        
        Park(
            map,
            [14.25683,121.40518],
             
        )
      
        Park(
            map,
            [14.25621,121.40537],
        )
      
        Park(
            map,
            [14.25621,121.40537],
             
        )
        Park(
            map,
            [14.25548,121.40098],
             
        )
        Park(
            map,
            [14.25552,121.40629],
             
        )
        Park(
            map,
            [14.25540,121.40596],
             
        )
    document.getElementById("rum").addEventListener("click", function () {
        allMarkers.forEach(function (marker) {
            if (!marker.hasOwnProperty('isSHS')) {
                map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        document.getElementById("rum").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isSHSL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
    
        document.getElementById("parking").addEventListener("click", function () {
        allMarkers.forEach(function (marker) {
            if (!marker.hasOwnProperty('isPk')) {
                map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        document.getElementById("parking").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isPk')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("opis").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isO')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("opis").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isOL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("bilding").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isB')) {
                    map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("bilding").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isBL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("kmplks").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isC')) {
                    map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("kmplks").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isCL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("cr").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                if (!marker.hasOwnProperty('isCr')) {
                    map.removeLayer(marker);
        
        
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("cr").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                if (!marker.hasOwnProperty('isCRL')) {
                    map.removeLayer(marker);
                } else {
                    map.addLayer(marker);
                }
            });
        });
        
        
        document.getElementById("all").addEventListener("click", function () {
            allMarkers.forEach(function (marker) {
                    map.addLayer(marker);
            });
        });
        
        
        document.getElementById("all").addEventListener("click", function () {
            allLabels.forEach(function (marker) {
                    map.addLayer(marker);
            });
        });

    //! ADMIN BUILDING POLYGON
    var polygonCoordinates = [
        [14.25701,121.40501],
        [14.25713,121.40534],
        [14.25664,121.40555],
        [14.25608,121.40578], 
        [14.25598,121.40582],
        [14.25595,121.40572],
        [14.25603,121.40554],
        [14.25612,121.40538],    
        [14.25631,121.40530],
        [14.25701,121.40501]
    ];

    var polygon = L.polygon(polygonCoordinates, {
        color: 'orange',       
        fillColor: 'orange', 
        fillOpacity: 0.05
    }).addTo(map);         

    polygon.bindPopup(`<i>Admin Building<i>`);

    //! POOL
    var polygonCoordinates = [
        [14.25566,121.40660],
        [14.25574,121.40680],
        [14.25531,121.40698],
        [14.25524,121.40678],
        [14.25566,121.40660],
        
    ];

    var polygon = L.polygon(polygonCoordinates, {  
        color: 'skyblue',       
        fillColor: 'skyblue', 
        fillOpacity: 1
    }).addTo(map);         

    polygon.bindPopup(`<i>Swimming Pool<i>`);

    //! ENGINEERING
    var polygonCoordinates = [
        [14.25501,121.40653],
        [14.25522,121.40704],
        [14.25498,121.40715],
        [14.25480,121.40670],
        [14.25483,121.40660],
        [14.25501,121.40653]
    ];

    var polygon = L.polygon(polygonCoordinates, {
        color: '#FD6666',       
        fillColor: 'red', 
        fillOpacity: 0.01
    }).addTo(map);         

    polygon.bindPopup(`<i>College of Engineering<i>`);

    //! CR
// var polygonCoordinates = [
//     [14.25605,121.40622],
//     [14.25593,121.40629],
//     [14.25590,121.40621],
//     [14.25602,121.40614],
//     [14.25605,121.40622]
// ];

// var polygon = L.polygon(polygonCoordinates, {
//     color: 'rgb(217, 208, 201)',       
//     fillColor: 'rgb(217, 208, 201)', 
//     fillOpacity: 1
// }).addTo(map);         

//! takip lang yah
/*var polygonCoordinates = [
    [14.25552,121.40634],
    [14.25536,121.40596],
    [14.25501,121.40612],
    [14.25516,121.40650]    
];

var polygon = L.polygon(polygonCoordinates, {
    color: 'rgb(217, 208, 201)',       
    fillColor: 'rgb(217, 208, 201)', 
    fillOpacity: 1
}).addTo(map);         

var polygonCoordinates = [
    [14.25486,121.40703],
    [14.25466,121.40711],
    [14.25497,121.40804],
    [14.25518,121.40796]      
];

var polygon = L.polygon(polygonCoordinates, {
    color: 'rgb(217, 208, 201)',       
    fillColor: 'rgb(217, 208, 201)', 
    fillOpacity: 1
}).addTo(map);         

var polygonCoordinates = [
    [14.25572,121.40753],
    [14.25580,121.40779],
    [14.25554,121.40790],
    [14.25543,121.40763],
    [14.25556,121.40758],
    [14.25562,121.40773],
    [14.25568,121.40770],
    [14.25563,121.40755],
];

var polygon = L.polygon(polygonCoordinates, {
    color: 'rgb(217, 208, 201)',       
    fillColor: 'rgb(217, 208, 201)', 
    fillOpacity: 1
}).addTo(map);         

var polygonCoordinates = [
    [14.25431,121.40888],
    [14.25431,121.40910],
    [14.25432,121.40910],
    [14.25432,121.40930],
    [14.25426,121.409346],
    [14.25404,121.40873],
    [14.25415,121.40868],
    [14.25424,121.40891]    
];

var polygon = L.polygon(polygonCoordinates, {
    color: 'rgb(217, 208, 201)',       
    fillColor: 'rgb(217, 208, 201)', 
    fillOpacity: 1
}).addTo(map);         */


