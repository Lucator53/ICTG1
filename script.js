var map = L.map('map', {
    zoom: 20,
    center: [14.25654, 121.40538],
    minZoom: 18,
    doubleClickZoom: false,
    maxBounds: [
        [14.2588, 121.4118],  // Northeast
        [14.2512, 121.4000] // Southwest
    ]
});

var hotlayer =  L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        zoom: 17.5,
        maxZoom: 21,
        bounds: [
            [14.2512, 121.4000], // Southwest
            [14.2588, 121.4118]  // Northeast
        ]
    }).addTo(map);

var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                zoom:18,
                maxZoom:19,
                bounds: [
                    [14.2512, 121.4000], // Southwest
                    [14.2588, 121.4118]  // Northeast
                ],
                }).addTo(map);

var osmFr =  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
               maxZoom: 21,
               bounds: [
                [14.2512, 121.4000], // Southwest
                [14.2588, 121.4118]  // Northeast
            ], 
                }).addTo(map);

var esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                zoom: 18,
                maxZoom: 18,
                bounds: [
                    [14.2512, 121.4000], // Southwest
                    [14.2588, 121.4118]  // Northeast
                ], 
                }).addTo(map);

 var baseLayers = {
     "Humanitarian": hotlayer,
     "OpenStreetMap": osmLayer,
     "OSM France": osmFr,
     "Esri Satellite": esriSatellite,
 };
 
 L.control.layers(baseLayers, null, { position: 'bottomright' }).addTo(map);
 
 L.control.locate({
     position: 'bottomright',
     icon: 'fa fa-location-arrow',
     drawCircle: false,
     drawMarker: true,
     showPopup: true
 }).addTo(map);
 map.zoomControl.setPosition('bottomright');

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
    [14.25557,121.40067], // Gate 1
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
    [14.255775,121.40572], // Jose Rizal Monument
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
    [14.25613,121.40571], //LU 08
    'info/lu08.html',
    "LU 08"
)

SHSMarker(
    map,
    [14.25634,121.40560], //LU 10
    'info/lu10.html',
    "LU 10"
)

SHSMarker(
    map,
    [14.25648,121.40554], //LU 12
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
    [30,-20]
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
    [14.25625,121.40565], //SHS Faculty
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
    [14.25640,121.40557], //Records Office
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
        customMarker.isCL =  true;

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
        [14.25606,121.40594], //Canteen
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
            iconSize: [15,15],
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
                iconSize: [15,15],
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
   
    //! Complex
    var polygonCoordinates = [
        [14.255416020629681, 121.40020529310539],
        [14.256729362699716, 121.40374793415992],
        [14.256766953361605, 121.40388354094284],
        [14.25677246091378, 121.40389904760605],
        [14.256796482530149, 121.40389285136791],
        [14.257493568904295, 121.40362913220372],
        [14.257947194282536, 121.40490124737192],
        [14.257138418856016, 121.40518159714401],
        [14.257199979293134, 121.40535900598667],
        [14.2561715995121, 121.4058435110527],
        [14.256301089241774, 121.40616109477907],
        [14.255886383031708, 121.40636338378971],
        [14.255792980442493, 121.40639489114994],
        [14.25629395752901, 121.407765976762],
        [14.256362206744598, 121.40836903135852],
        [14.256198314803683, 121.40879858843556],
        [14.25642545244959, 121.40973162752499],
        [14.256754182293335, 121.4106212924928],
        [14.255347055603266, 121.41103261977861],
        [14.254965651085342, 121.40996032361443],
        [14.254347634703663, 121.41018277788226],
        [14.253776613418083, 121.40867525113487],
        [14.254530390673963, 121.40833757863959],
        [14.255023387651391, 121.4081815168883],
        [14.254528776139026, 121.40685423592942],
        [14.254130100150292, 121.40602016049758],
        [14.253720053783681, 121.40538232800202],
        [14.254193439048763, 121.4043967233311],
        [14.254044449695925, 121.4040298391352],
        [14.254689136743139, 121.40374190524363],
        [14.254841978076712, 121.4041930931595],
        [14.256444353121736, 121.40354106643605],
        [14.255206065207943, 121.40042209798918],
        [14.255416020629681, 121.40020529310539]
    ];

    var polygon = L.polygon(polygonCoordinates, {
        color: 'rgba(0, 134, 57, 0.6)',     
        fillOpacity: 0
    }).addTo(map);         



