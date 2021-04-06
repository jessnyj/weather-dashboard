# weather-dashboard

![License](https://img.shields.io/badge/license-MIT-181717?style=for-the-badge) 

## Table of Contents
||||
|:-:|:-:|:-:|
|[Table Contents](#table-of-contents)|[Deployed Link](#deployed-link)|[Technologies Used](#technologies-used)
|[Description](#description)|[Work Involved](#work-involved)|[Code Snippet](#code-snippet)
|[License](#license)|[Authors](#authors)|[Acknowledgments](#acknowledgments)

## Deployed Link
[Deployed Link](https://jessnyj.github.io/weather-dashboard/)

## Site Gif
![Site](./images/weather-dash.gif)

## Technologies Used
|||||
|:-:|:-:|:-:|:-:|
|Weather API		|Moment.js			|jQuery	|Javascript
|HTML	|CSS	|Bootstrap	|Github
---

## Description
This application utilizes third-party APIs in order to retrieve
weather data for cities. When you search for a city within the search bar, current and future weather conditions are displayed, as well as the city name, the date, icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. The UV index is also color coordinated to indicate whether the conditions are favorable or unfavorable. A 5-day forecast is also displayed.

## Work Involved
For this application, I incorporated third party APIs in order to retrive weather information about cities and for the UV index. I developed search field, the 5day forecast, and the remainder of the website utilizing CSS, Bootstrap, and HTML.

 ## Code Snippet
 * This code snippet demonstrates how the city search functionality works.
 ```
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

```

## Authors
**UC Berkeley Coding Bootcamp**

**Jessny Joseph** 

[Github](https://github.com/jessnyj) | [LinkedIn](https://www.linkedin.com/in/jessny-joseph-361515201)

## Acknowledgments
I would like to thank the mentors and colleagues who helped inspire and improve upon this project.
