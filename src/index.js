function updateDate() {
	let rightNow = document.querySelector("#right-now");
	let now = new Date();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	let day = days[now.getDay()];

	let timeHour = now.getHours();
	if (timeHour < 10) {
		timeHour = `0${timeHour}`;
	}

	let timeMins = now.getMinutes();
	if (timeMins < 10) {
		timeMins = `0${timeMins}`;
	}

	rightNow.innerHTML = `${day} ${timeHour}:${timeMins}`;
}

updateDate();

function updateWeather(response) {
	document.querySelector("#main-temp").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#temp-low").innerHTML = Math.round(
		response.data.main.temp_min
	);
	document.querySelector("#temp-high").innerHTML = Math.round(
		response.data.main.temp_max
	);
	document.querySelector("#humidity").innerHTML = Math.round(
		response.data.main.humidity
	);

	let windspeed = document.querySelector("#windspeed"); //define windspeed element
	let windspeedData = Math.round(response.data.wind.speed); //define windspeed data
	windspeed.innerHTML = windspeedData; //update the HTML

	let descriptor = document.querySelector("#weather-description"); //define the descriptor element
	let descriptorData = response.data.weather[0].description; //define the descriptor data
	descriptor.innerHTML = descriptorData; //update the HTML
}

function updateCity(event) {
	event.preventDefault();
	let newCity = document.querySelector("#search-bar"); //define the search bar to get the value. confirmed works
	let titleCity = document.querySelector("#placeholder-city"); //define the city title to change it
	titleCity.innerHTML = newCity.value;
	let city = newCity.value;
	let apiKey = "8ccf37f47c78fce7cbde0d0a29369196";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(updateWeather);
	console.log(apiKey);
	console.log(apiUrl);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

/*function updateToCelsius(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = "18";
} */

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", updateCity);

function updateToFahrenheit(event) {
	event.preventDefault();
	let mainTemp = document.querySelector("#main-temp");
	let theTemp = mainTemp.innerHTML;
	mainTemp.innerHTML = Math.round((theTemp * 9) / 35 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", updateToFahrenheit);

function showLocalWeather(response) {
	document.querySelector("#main-temp").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#temp-low").innerHTML = Math.round(
		response.data.main.temp_min
	);
	document.querySelector("#temp-high").innerHTML = Math.round(
		response.data.main.temp_max
	);
	document.querySelector("#humidity").innerHTML = Math.round(
		response.data.main.humidity
	);
	document.querySelector("#windspeed").innerHTML = Math.round(
		response.data.wind.speed
	);

	let descriptor = document.querySelector("#weather-description"); //define the descriptor element
	let descriptorData = response.data.weather[0].description; //define the descriptor data
	descriptor.innerHTML = descriptorData; //update the HTML

	let titleCity = document.querySelector("#placeholder-city"); //define the element
	let localArea = response.data.name; //define the data
	titleCity.innerHTML = localArea; //update the HTML
}

function updateUrl(position) {
	let apiKey = "8ccf37f47c78fce7cbde0d0a29369196";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showLocalWeather);
	//console.log(url); this was to test, woohoo it works
}

function retrievePosition() {
	navigator.geolocation.getCurrentPosition(updateUrl);
}

let locationButton = document.querySelector("#currentLocationButton"); //define the current location button
locationButton.addEventListener("click", retrievePosition); //add event listener for the button

//navigator.geolocation.getCurrentPosition(retrievePosition); how to work this into function
