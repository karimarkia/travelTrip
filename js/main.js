import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatheService from './services/weather.service.js'


window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({
                lat: 32.0881183,
                lng: 34.803004
            });
        })
        .catch(console.log('INIT MAP ERROR'));

    document.querySelector('.btn-loc').addEventListener('click', onLoadMyLoc);
    document.querySelector('.search-input').addEventListener('keyup', onGetInput);
    document.querySelector('.search-btn').addEventListener('click', onSearchForLoc);
    document.querySelector('.btn-marker').addEventListener('click', onAddMarker);
    document.querySelector('.copy-loc-btn').addEventListener('click', copyLoc);

}


function onLoadMyLoc() {
    let coords
    locService.getPosition()
        .then(res => {
            coords = res.coords
            renderCurrPos(coords.latitude, coords.longitude)
        })
        .then(() => {
            mapService.addMarker({
                lat: coords.latitude,
                lng: coords.longitude
            })
        })
        .then(() => {
            loadWeather(coords)
        })
        .then(() => {
            setLocUrl(coords.latitude, coords.longitude);
        }).catch(console.warn);
}

function renderCurrPos(latitude, longitude) {
    mapService.initMap(latitude, longitude)
}

function loadWeather(coord) {
    weatheService.getWeather(coord)
        .then((res) => {
            res.json()
                .then((res) => {
                    renderWeather(res)
                })
        })
}


function renderWeather(weatherData) {
    console.log(weatherData);

    let elWeather = document.querySelector('.weather');
    
    elWeather.innerHTML = `
    <h4>${weatherData.name}</h4>
    <div>
    <h3>${weatherData.weather[0].description}</h3>
    <img class="img-weather" src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png">
    </div>
    <div>
    <h3>Temp:</h3> ${weatherData.main.temp}&#8451;
    </div>
    <div>
    <h3>Humidity:</h3> ${weatherData.main.humidity}% 
    </div>
    <div>
    <h3>Cloudiness:</h3> ${weatherData.clouds.all}% 
    </div>
    `
}


function onGetInput(ev) {
    // if (ev.keyCode === 'Enter') return
    if (ev.keyCode === 13)
        onSearchForLoc()
}

function onSearchForLoc() {
    var loc
    var searchInput = document.querySelector('.search-input').value;
    mapService.searchByAddress(searchInput)
        .then((res) => {
            loc = res.results[0].geometry.location;
            renderCurrPos(loc.lat, loc.lng)
        })
        .then(() => {
            mapService.addMarker({
                lat: loc.lat,
                lng: loc.lng
            })
        })
        .then(() => {
            loadWeather({
                latitude: loc.lat,
                longitude: loc.lng
            })
        })
        .then(() => {
            setLocUrl(loc.lat, loc.lng)
        })
        .catch(console.warn);
}

function onAddMarker() {
    let center = mapService.getMapCenter()
    let loc = {
        lat: center.lat(),
        lng: center.lng()
    }
    mapService.addMarker(loc)
}

function copyLoc() {
    var elInput = document.querySelector('.copy-loc-input');
    console.log(elInput);
    
    elInput.select();
    document.execCommand('copy');
}

function setLocUrl(lat, lng) {
    document.querySelector('.copy-loc-input').value = `https://karimarkia.github.io/travelTrip/index.html?lat=${lat}&lng=${lng}`;
}