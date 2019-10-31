let W_KEY = 'dcce2e8980961ef5d95b8b5594b059a9'

function getWeather(loc) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&units=metric&APPID=${W_KEY}`)
}

export default {
    getWeather
}