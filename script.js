$(document).ready(function () {
    // Today's Weather 
    var APIKey = "b2803d08257a2919cdac41bd8ceb3835"
    function displayWeather(citySearch) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKey,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var tempNew = Math.round(((response.main.temp) - 273.15) * 9 / 5 + 32)
            var weatherObj = response.weather[0].icon;
            var weatherUrl = "http://openweathermap.org/img/wn/" + weatherObj + ".png";

            $("#cityName").html("<h1>" + response.name + " " + "(" + moment().format('L') + ") " + "<img src=" + weatherUrl + ">" + "</h1>");
            var windSpeed = response.wind.speed;
            $("#temp").text("Temperature: " + tempNew + " °F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#wind").text("Wind Speed: " + windSpeed + " MPH");

            uvindex(response.coord.lon, response.coord.lat);
            forecast(response.coord.lon, response.coord.lat);
        });
    }

    // UV Index
    function uvindex(longitude, latidute) {
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latidute + "&lon=" + longitude + "&appid=" + APIKey
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#uvindex").text("UV Index: " + response.value);
        })
    }

    // 5day forecast
    var APIKey2 = "f0dce85278aa72524554b8d53e297782"
    function forecast(longitude, latidute) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latidute + "&lon=" + longitude + "&exclude=hourly,minutely,current&appid=" + APIKey2 + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.daily[0].dt);
            // for loop to display each day
            for (var i = 0; i < 5; i++) {
                var dateCurrent = moment.unix(response.daily[i].dt).format('L');
                console.log(dateCurrent);

                var iconObj = response.daily[i].weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/wn/" + iconObj + ".png";

                $("#forecast-append").append(`
                
                <div id="forecastCard" class="card text-white bg-primary mb-3">
                        <div class="forecast"></div>
                        <div class="body-forecast">
                            <p class="date0">${dateCurrent}</p>
                            <p class="icon0"><img src=" ${iconUrl}" ></p>
                            <p class="temp0">Temp: ${response.daily[i].temp.day} °F</p>
                            <p class="humidity0">Humidity: ${response.daily[i].humidity} %</p>
                        </div>
                    </div>
            
                `)
            }
        })
    }

    // Search button
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        var citySearch = $("#searchinput").val();
        displayWeather(citySearch);
        $("#searchinput").val("");
    });
});








