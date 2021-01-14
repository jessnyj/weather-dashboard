var APIKey = "b2803d08257a2919cdac41bd8ceb3835"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var city = $("citySearch").val();

function displayWeather() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        var tempNew = Math.round(((response.main.temp) - 273.15) * 9 / 5 + 32)

        // Transfer content to HTML
        $(city).html("<h1>" + response.name + " moment().subtract(10, 'days').calendar();</h1>");
        var windSpeed = response.wind.speed;
        $("#temp").text("Temperature (F) " + tempNew);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind").html("<p>Wind Speed: " + windSpeed + "</p>");

        // Log the data in the console 
        console.log("Temperature (F): " + response.main.temp);
        console.log("Humidity: " + response.main.humidity);
        console.log("Wind Speed: " + response.wind.speed);

        uvindex(response.coord.lon, response.coord.lat);
    });
}

displayWeather()

// UV Index
function uvindex(longitude, latidute) {
    var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latidute + "&lon=" + longitude + "&appid=" + APIKey

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL2);
        console.log(response);
    })

}

function renderButtons () {

}

// Search button
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var search = $("#searchinput").val().trim();
    search.push(city);
    renderButtons();

});

$(document).on("click", "#searchBtn", displayWeather);
renderButtons();


// 5day forecast
var APIKey2 = "f0dce85278aa72524554b8d53e297782"
var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey2;

function forecast() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response); 
});