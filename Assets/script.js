$(document).ready(function () {
    var APIKey = "b2803d08257a2919cdac41bd8ceb3835"

    function displayWeather(citySearch) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKey,
            method: "GET"
        }).then(function (response) {
            
            console.log(response);

            var tempNew = Math.round(((response.main.temp) - 273.15) * 9 / 5 + 32)

            // Transfer content to HTML
            $("#cityName").html("<h1>" + response.name + " " + "(" + moment().format('L') + ")" + " " + "<i class='fa fa-cloud' style='font-size:35px;color:grey'></i></h1>");
            var windSpeed = response.wind.speed;
            $("#temp").text("Temperature (F) " + tempNew);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#wind").text("Wind Speed: " + windSpeed);

            // Log the data in the console 
            console.log("Temperature (F): " + response.main.temp);
            console.log("Humidity: " + response.main.humidity);
            console.log("Wind Speed: " + response.wind.speed);

            uvindex(response.coord.lon, response.coord.lat);
            console.log(citySearch);

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
            console.log(queryURL2);
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
            
            // for loop to display each day
            for (var i = 0; i < 5; i++) {
                var dateCurrent = new Date((response.daily[i].dt)* 1000).toLocaleDateString();
                $(".date0").text(dateCurrent);
                $(".icon0").text(response.weather.icon)
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








