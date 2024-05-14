const markers = [];

//! MARKERS
markers.push({
  name: "Oreta Building",
  coordinates: [14.25564,121.40778],
});

markers.push({
  name: "Gate 1",
  coordinates: [14.25557,121.40067],
});

markers.push({
  name: "Gate 2",
  coordinates: [14.25626, 121.40779],
});

markers.push({
  name: "Athlete's Village",
  coordinates: [14.25490,121.40754],
});

markers.push({
  name: "Jose Rizal Monument",
  coordinates: [14.255775,121.40572],
});

markers.push({
  name: "LU 01",
  coordinates: [14.25674,121.40529],
});

markers.push({
  name: "LU 02",
  coordinates: [14.25666,121.40532],
});

markers.push({
  name: "LU 03",
  coordinates: [14.25660,121.40535],
});

markers.push({
  name: "LU 04",
  coordinates: [14.25648,121.40540],
});

markers.push({
  name: "LU 05",
  coordinates: [14.25639,121.40544],
});

markers.push({
  name: "LU 06",
  coordinates: [14.25630,121.40548],
});

markers.push({
  name: "CHS Laboratory",
  coordinates: [14.25619,121.40553],
});

markers.push({
  name: "LU 07",
  coordinates: [14.25619,121.40553],
});

markers.push({
  name: "LU 08",
  coordinates: [14.25613,121.40571],
});

markers.push({
  name: "SHS Faculty Room",
  coordinates: [14.25625,121.40565],
});

markers.push({
  name: "LU 09",
  coordinates: [14.25625,121.40565],
});

markers.push({
  name: "LU 10",
  coordinates: [14.25634,121.40560],
});

markers.push({
  name: "Records Office",
  coordinates: [14.25640,121.40557],
});

markers.push({
  name: "LU 11",
  coordinates: [14.25640,121.40557],
});

markers.push({
  name: "LU 12",
  coordinates: [14.25648,121.40554],
});

markers.push({
  name: "Registrar's Office",
  coordinates: [14.25658,121.40549],
});

markers.push({
  name: "LU 13",
  coordinates: [14.25658,121.40549],
});

markers.push({
  name: "LU 14",
  coordinates: [14.25658,121.40549],
});

markers.push({
  name: "LU 15",
  coordinates: [14.25670,121.40544],
});

markers.push({
  name: "University Clinic",
  coordinates: [14.25675,121.40542],
});

markers.push({
  name: "LU 16",
  coordinates: [14.25675,121.40542],
});

markers.push({
  name: "Research Center",
  coordinates: [14.25686,121.40537],
});
markers.push({
  name: "LU 17",
  coordinates: [14.25686,121.40537],
});

markers.push({
  name: "HRMO",
  coordinates: [14.25692,121.40534],
});

markers.push({
  name: "LU 18",
  coordinates: [14.25692,121.40534],
});

markers.push({
  name: "Cashier's Office",
  coordinates: [14.25699,121.40531],
});

markers.push({
  name: "LU 19",
  coordinates: [14.25699,121.40531],
});

markers.push({
  name: "Admin Office",
  coordinates: [14.25705,121.40529],
});

markers.push({
  name: "LU 20",
  coordinates: [14.25707,121.40528],
});

markers.push({
  name: "San Luis Gym",
  coordinates: [14.25523,121.40620],
});

markers.push({
  name: "Multi-Purpose Gym",
  coordinates: [14.25467,121.40630],
});
markers.push({
  name: "MP",
  coordinates: [14.25467,121.40630],
});

markers.push({
  name: "Pool Area",
  coordinates: [14.25547,121.40677],
});


markers.push({
  name: "New Building",
  coordinates: [14.25426,121.40904],
});

markers.push({
  name: "NB",
  coordinates: [14.25426,121.40904],
});


markers.push({
  name: "Canteen",
  coordinates: [14.25606,121.40594],
});


markers.push({
  name: "M.E Offices",
  coordinates: [14.25506,121.40684],
});


markers.push({
  name: "Chem Lab",
  coordinates: [14.25510,121.40691],
});


markers.push({
  name: "Chemical Laboratory",
  coordinates: [14.25510,121.40691],
});


markers.push({
  name: "Bio Lab",
  coordinates: [14.25512,121.40697],
});


markers.push({
  name: "Biological Laboratory",
  coordinates: [14.25512,121.40697],
});


markers.push({
  name: "Physics Lab",
  coordinates: [14.25514,121.40703],
});


markers.push({
  name: "Physical Laboratory",
  coordinates: [14.25514,121.40703],
});


markers.push({
  name: "Automotive",
  coordinates: [14.25498,121.40665],
});


markers.push({
  name: "Machine Shop",
  coordinates: [14.25491,121.40685],
});

markers.push({
  name: "Admin",
  coordinates: [14.25654,121.40542],
});

markers.push({
  name: "Annex Building",
  coordinates: [14.25654,121.40542],
});

markers.push({
  name: "M.E Building",
  coordinates: [14.25500,121.40692],
});

markers.push({
  name: "College of Engineering",
  coordinates: [14.25500,121.40692],
});

markers.push({
  name: "LU Website",
  coordinates: [],
});

markers.push({
  name: "Rate Us!",
  coordinates: [],
});

markers.push({
  name: "Contact Us & About Us",
  coordinates: [],
});

markers.push({
  name: "Exit",
  coordinates: [],
});


function zoomToMarker(markerName) {
  console.log("Marker name:", markerName);
  const foundMarker = markers.find(marker => marker.name === markerName);
  if (foundMarker) {
    console.log("Found marker:", foundMarker);
    const maxZoomLevel = 20.3;
    map.setView(foundMarker.coordinates, maxZoomLevel);
    simulateMarkerClick(foundMarker);
  } else {
    alert("Marker not found.");
  }
}

document.querySelectorAll('.submenu a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); 
    const markerName = this.textContent.trim(); 
    console.log("Clicked link:", markerName);
    zoomToMarker(markerName); 

    const parentLi = this.closest('li'); 
    if (parentLi.id !== 'settings') {
      const markerName = this.textContent.trim();
      console.log("Clicked link:", markerName);
      zoomToMarker(markerName);
    }
     
  });
});

document.getElementById('output').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const searchQuery = document.getElementById('output').value.trim();

    if (searchQuery !== "") {
      searchMarkers(searchQuery);
    } else {
      alert("Please enter a search query.");
    }
  }
});

let maxZoomReached = false;

function searchMarkers(query) {
  let selectedMarker = null;

  const formattedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');

  markers.forEach((marker) => {
    const formattedMarkerName = marker.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (formattedMarkerName.includes(formattedQuery)) {
      selectedMarker = marker;
      const maxZoomLevel = 20.3; 
      map.setView(marker.coordinates, maxZoomLevel);
      maxZoomReached = true;
      simulateMarkerClick(selectedMarker);
    }
  });

  if (!selectedMarker) {
    alert("No matching marker found for the search query.");
  }
}

function simulateMarkerClick(marker) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker && layer.getLatLng().equals(marker.coordinates)) {
      layer.openPopup();
    }
  });
}

document.getElementById('srchbtn').addEventListener('click', function () {
  const searchQuery = document.getElementById('output').value.trim();

  if (searchQuery !== "") {
    searchMarkers(searchQuery);
  } else {
    alert("Please enter a search query.");
  }
});
document.getElementById('locatic').addEventListener('click', function () {
  const searchQuery = document.getElementById('output').value.trim();

  if (searchQuery !== "") {
    locateAndRoute(searchQuery);
  } else {
    alert("Please enter a search query.");
  }
});

let routingControl = null; 

function locateAndRoute(searchQuery) {
  map.locate({ setView: true, maxZoom: 19 });

  function onLocationFound(e) {
    const currentPosition = e.latlng;
    let destination = null;

    
    markers.forEach((marker) => {
      const formattedMarkerName = marker.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const formattedQuery = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '');

      if (formattedMarkerName.includes(formattedQuery)) {
        destination = L.latLng(marker.coordinates);
      }
    });

    if (destination) {
     
      if (routingControl) {
        map.removeControl(routingControl);
      }

     
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(currentPosition),
          destination
        ],
        routeWhileDragging: false
      }).addTo(map);
    } else {
      alert("No matching marker found for the search query.");
    }
  }

  map.on('locationfound', onLocationFound);
}


function createUserLocationMarker(latlng) {
  return L.marker(latlng, { draggable: false }).addTo(map);
}

function removeRoutingControl() {
  if (routingControl) {
      map.removeControl(routingControl);
      routingControl = null;
  }
  location.reload();
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


