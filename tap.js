var map = L.map('map').setView([14.25559, 121.40774], 20); // oreta building
var map = L.map('map').setView([14.25426,121.40904], 20); // new building
var map = L.map('map').setView([14.25568, 121.4058], 20); //rizal
var map = L.map('map').setView([14.25499, 121.40753], 20); // new building

var map = L.map('map').setView([14.25523,121.40620], 20);// san luis
var map = L.map('map').setView([14.25467,121.40630], 20);//multi gym
var map = L.map('map').setView([14.25547,121.40677], 20);//complex pool


// Function to fly to the specified marker
function flyToMarker(markerId) {
    switch (markerId) {
        

            case 'Oreta Building':
            map.flyTo([14.25559, 121.40774], 20); // Fly to Lu01 marker location
            break;

            case 'New Building':
            map.flyTo([14.25426,121.40904], 20); // Fly to Lu01 marker location
            break;

            case 'Rizal':
            map.flyTo([14.25568, 121.4058], 20); // Fly to Lu01 marker location
            break;

            case 'Canteen':
            map.flyTo([14.25604,121.40604], 20); // Fly to Lu01 marker location
            break;

            case 'Athletes Village':
            map.flyTo([14.25499, 121.40753], 20); // Fly to Lu01 marker location
            break;

            case 'San Luis Gym':
            map.flyTo([14.25523,121.40620], 20); // clinic
            break;

            case 'Multi-Purpose Gym':
            map.flyTo([14.25467,121.40630], 20); // clinic
            break;

            case 'Laguna Sports Complex Pool':
            map.flyTo([14.25547,121.40677], 20); // clinic
            break;
    }
}