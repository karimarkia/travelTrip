const API_KEY = 'AIzaSyA7CesngUTwEiPGTHR4xr4ihP34lafhcXU'; //TODO: Enter your API Key



export default {
    initMap,
    addMarker,
    panTo,
    searchByAddress,
    getMapCenter
}


var map;


export function initMap(lat = 32.0881183, lng = 34.803004) {
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: {
                        lat,
                        lng
                    },
                    zoom: 15
                })
        })
}

function addMarker(loc) {
    let iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Flag-3-Left-Pink-icon.png'
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'You are here',
        icon: iconUrl
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function searchByAddress(address) {
    return _connectGoogleApi()
        .then(() => {
            return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        })
        .then(res => {
            return res.json()
        })
}


function getMapCenter() {
    return map.getCenter();
}