/*global $ APIKEY navigator*/
var unit;
var unit2;
var unit3;
var latNum;
var lonNum;

//Finds location
window.onload = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } 
        else {
            document.getElementByTag('body').innerHTML = "Geolocation is not supported by this browser.";
        }
    function showPosition(position) {
        latNum = position.coords.latitude;
        lonNum = position.coords.longitude;
    }
};

//Ajax call to obtain weather info
function showWeather() {
    if (document.getElementById('unitF').checked) {
        unit = "imperial";
        unit2 = "F";
        unit3 = "mph";
    }
    else if (document.getElementById('unitC').checked) {
        unit = "metric";
        unit2 = "C";
        unit3 = "m/s";
    }
    // console.log(unit);
    $.ajax ({
        method: 'GET',
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: { lat: latNum, lon: lonNum, units: unit, appid: APIKEY },
        success: function(data) {
            // console.log(data);
            document.getElementById('weather').style.padding = "10px";
            document.getElementById('place').innerHTML = "In " + '<i class="fa fa-1x fa-map-marker"></i> ' +  data.name + ": ";
            document.getElementById('temp').innerHTML = "Temp: " + data.main.temp + " °" + unit2;
            var image = document.createElement("IMG");
            image.setAttribute("src","https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            document.getElementById('description').innerHTML =  data.weather[0].main;
            document.getElementById('description').appendChild(image);
            document.getElementById('wind').innerHTML = "Wind speed: " + data.wind.speed + " " + unit3;
            document.getElementById('full').innerHTML = "Humidity: " + data.main.humidity + "%";
            // console.log(image);
        }
    });
    event.preventDefault();
}