// fetching elements
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const changeUnitBtn = document.querySelector("[change-unit]");
const errorScreen = document.querySelector(".error-gif");
const errorMsg = document.querySelector(".error-msg-container");

// declaring and initializing variables
let currentTab = userTab;
const API_KEY = "04d1d28e847e483bf9bccc321aaa6c7c";
currentTab.classList.add("current-tab");
changeUnitBtn.innerText = "Fahrenheit";
let coordinates;
let cityName;

// asking for user location
getfromSessionStorage();

// function for switching between tabs
function switchTab(newTab) {
    if(newTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = newTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            // if search container is not visible, then it is the clicked tab
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            // else search container is not the clicked tab
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // get data to show for user tab
            getfromSessionStorage();
        }
    }
}

// if user tab is clicked 
userTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(userTab);
});

// if search tab is clicked
searchTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});


//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    if(!localCoordinates) {
        // ask for location
        grantAccessContainer.classList.add("active");
    }
    else {
        // fetch data for user location
        coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

// function to fetch data for a requested coordinates
async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grant container invisible
    grantAccessContainer.classList.remove("active");
    // make user container invisible
    userInfoContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");
    // make error screen invisible
    errorScreen.classList.remove("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if(!response.ok) {
            throw new Error('Fetch request failed: ' + response.status);
        }

        const response1 = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data1 = await response1.json();

        if(!response1.ok) {
            throw new Error('Fetch request failed: ' + response.status);
        }

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data, data1);
    }
    // error handling
    catch(err) {
        console.error("Error fetching weather data:", err);
        loadingScreen.classList.remove("active");
        errorScreen.classList.add("active");
    }

}

// Update the UI
function renderWeatherInfo(weatherInfo, weatherInfo1) {

    // remove error screen if present
    errorScreen.classList.remove("active");
    
    //fetch the elements 
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");
 
    const forecastDate1 = document.querySelector("[f-dd-1");
    const forecastIcon1 = document.querySelector("[f-i-1]");
    const forecastDesc1 = document.querySelector("[f-d-1]");
 
    const forecastDate2 = document.querySelector("[f-dd-2");
    const forecastIcon2 = document.querySelector("[f-i-2]");
    const forecastDesc2 = document.querySelector("[f-d-2]");
  
    const forecastDate3 = document.querySelector("[f-dd-3");
    const forecastIcon3 = document.querySelector("[f-i-3]");
    const forecastDesc3 = document.querySelector("[f-d-3]");
 
    const forecastDate4 = document.querySelector("[f-dd-4");
    const forecastIcon4 = document.querySelector("[f-i-4]");
    const forecastDesc4 = document.querySelector("[f-d-4]");
 
    const forecastDate5 = document.querySelector("[f-dd-5");
    const forecastIcon5 = document.querySelector("[f-i-5]");
    const forecastDesc5 = document.querySelector("[f-d-5]");

    //fetch values and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
    
    forecastDate1.innerText = weatherInfo1?.list[7]?.dt_txt.slice(0,10);
    forecastIcon1.src = `http://openweathermap.org/img/w/${weatherInfo1?.list[7]?.weather?.[0]?.icon}.png`;
    forecastDesc1.innerText = weatherInfo1?.list[7]?.weather[0]?.description;
    
    forecastDate2.innerText = weatherInfo1?.list[15]?.dt_txt.slice(0,10);
    forecastIcon2.src = `http://openweathermap.org/img/w/${weatherInfo1?.list[15]?.weather?.[0]?.icon}.png`;
    forecastDesc2.innerText = weatherInfo1?.list[15]?.weather[0]?.description;
    
    forecastDate3.innerText = weatherInfo1?.list[23]?.dt_txt.slice(0,10);
    forecastIcon3.src = `http://openweathermap.org/img/w/${weatherInfo1?.list[23]?.weather?.[0]?.icon}.png`;
    forecastDesc3.innerText = weatherInfo1?.list[23]?.weather[0]?.description;

    forecastDate4.innerText = weatherInfo1?.list[31]?.dt_txt.slice(0,10);
    forecastIcon4.src = `http://openweathermap.org/img/w/${weatherInfo1?.list[31]?.weather?.[0]?.icon}.png`;
    forecastDesc4.innerText = weatherInfo1?.list[31]?.weather[0]?.description;

    forecastDate5.innerText = weatherInfo1?.list[39]?.dt_txt.slice(0,10);
    forecastIcon5.src = `http://openweathermap.org/img/w/${weatherInfo1?.list[39]?.weather?.[0]?.icon}.png`;
    forecastDesc5.innerText = weatherInfo1?.list[39]?.weather[0]?.description;

    // for putting temperature values in appropriate unit 
    changeUnit(weatherInfo, weatherInfo1);
}

// check if geolocation is available to the user
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        errorMsg.classList.add("active");
    }
}

// store user coordinates as an object in the session storage
function showPosition(position) {

    if (errorMsg.classList.contains("active")) {
        errorMsg.classList.remove("active");
    }

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    coordinates = userCoordinates;
    fetchUserWeatherInfo(userCoordinates);

}

// allowing user to give access to their location
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

// fetch search input field
const searchInput = document.querySelector("[data-searchInput]");
// make use of the searched value
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

// fetch the data for the searched place
async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    errorScreen.classList.remove("active");

    // api call
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        data = await response.json();

        if(!response.ok) {
            throw new Error('Fetch request failed: ' + response.status);
        }

        const response2 = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);

        data2 = await response2.json();

        if(!response2.ok) {
            throw new Error('Fetch request failed: ' + response.status);
        }
     
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data, data2);   
    }
    // error handling
    catch(err) {
        console.error("Error fetching weather data:", err);
        loadingScreen.classList.remove("active");
        errorScreen.classList.add("active");
    }
}

// function to assign values to temp fields and change their units
function changeUnit(weatherInfo, weatherInfo1) {

    // fetching required elements
    const temp = document.querySelector("[data-temp]");
    const minTemp = document.querySelector("[min-temp]");
    const maxTemp = document.querySelector("[max-temp]");

    const forecastTemp1 = document.querySelector("[f-t-1]");
    const forecastTemp2 = document.querySelector("[f-t-2]");
    const forecastTemp3 = document.querySelector("[f-t-3]");
    const forecastTemp4 = document.querySelector("[f-t-4]");
    const forecastTemp5 = document.querySelector("[f-t-5]");

    // changing unit to celcius
    if (changeUnitBtn.innerText === "FAHRENHEIT") {
        temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;
        minTemp.innerText = `Min: ${weatherInfo?.main?.temp_min.toFixed(2)} °C`;
        maxTemp.innerText = `Max: ${weatherInfo?.main?.temp_max.toFixed(2)} °C`;

        forecastTemp1.innerText = `${weatherInfo1?.list[7]?.main?.temp.toFixed(2)} °C`;
        forecastTemp2.innerText = `${weatherInfo1?.list[15]?.main?.temp.toFixed(2)} °C`;
        forecastTemp3.innerText = `${weatherInfo1?.list[23]?.main?.temp.toFixed(2)} °C`;
        forecastTemp4.innerText = `${weatherInfo1?.list[31]?.main?.temp.toFixed(2)} °C`;
        forecastTemp5.innerText = `${weatherInfo1?.list[39]?.main?.temp.toFixed(2)} °C`;
    }

    // changing unit to fahrenheit using coversion formula
    if (changeUnitBtn.innerText === "CELSIUS") {
        const newTemp = ((weatherInfo?.main?.temp * 9/5) + 32).toFixed(2);
        const newMinTemp = ((weatherInfo?.main?.temp_min * 9/5) + 32).toFixed(2);
        const newMaxTemp = ((weatherInfo?.main?.temp_max * 9/5) + 32).toFixed(2);

        const newForecastTemp1 = ((weatherInfo1?.list[7]?.main?.temp * 9/5) + 32).toFixed(2);
        const newForecastTemp2 = ((weatherInfo1?.list[15]?.main?.temp * 9/5) + 32).toFixed(2);
        const newForecastTemp3 = ((weatherInfo1?.list[23]?.main?.temp * 9/5) + 32).toFixed(2);
        const newForecastTemp4 = ((weatherInfo1?.list[31]?.main?.temp * 9/5) + 32).toFixed(2);
        const newForecastTemp5 = ((weatherInfo1?.list[39]?.main?.temp * 9/5) + 32).toFixed(2);

        temp.innerText = `${newTemp} °F`;
        minTemp.innerText = `Min: ${newMinTemp} °F`;
        maxTemp.innerText = `Max: ${newMaxTemp} °F`;

        forecastTemp1.innerText = `${newForecastTemp1} °F`;
        forecastTemp2.innerText = `${newForecastTemp2} °F`;
        forecastTemp3.innerText = `${newForecastTemp3} °F`;
        forecastTemp4.innerText = `${newForecastTemp4} °F`;
        forecastTemp5.innerText = `${newForecastTemp5} °F`;
    }
}

// handling the working of change unit button
changeUnitBtn.addEventListener("click", () => {
    if (changeUnitBtn.innerText === "FAHRENHEIT") {
        changeUnitBtn.innerText = "CELSIUS";
    }
    else {
        changeUnitBtn.innerText = "FAHRENHEIT";
    }

    // calling appropriate function based on current tab
    if (currentTab === searchTab) {
        fetchSearchWeatherInfo(cityName);
    }
    else {
        fetchUserWeatherInfo(coordinates);
    }
});

const clearBtn = document.querySelector("[clear-btn]");
// clearing the input field using clear button
clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.opacity = '0';
});

// hiding and displaying the above button
searchInput.addEventListener("input", () => {
    if (searchInput.value !== "") {
        clearBtn.style.opacity = '1';
    }
    else {
        clearBtn.style.opacity = '0';
    }
});

const clearErrorBtn = document.querySelector("[error-msg-close-btn]");
// hiding the error pop up for geolocation
clearErrorBtn.addEventListener("click", () => {
    errorMsg.classList.remove("active");
})