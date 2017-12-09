/*global $ APIKEY navigator*/
var unit;
var unit2;
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
    }
    else if (document.getElementById('unitC').checked) {
        unit = "metric";
        unit2 = "C";
    }
    // console.log(unit);
    $.ajax ({
        method: 'GET',
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: { lat: latNum, lon: lonNum, units: unit, appid: APIKEY },
        success: function(data) {
            // console.log(data);
            document.getElementById('place').innerHTML = "In " + "<i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i>" + data.name + ": ";
            document.getElementById('temp').innerHTML = "Temp: " + data.main.temp + "°" + unit2;
            var image = document.createElement("IMG");
            image.setAttribute("src","https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            document.getElementById('description').innerHTML =  data.weather[0].main;
            document.getElementById('description').appendChild(image);
            // console.log(image);
        }
    });
    event.preventDefault();
}