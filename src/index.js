import "./styles/style.css";


const closeModalBtn = document.getElementById('closeModalBtn');

closeModalBtn.addEventListener('click', closeModal);


const btn = document.querySelector("#btn");

btn.addEventListener('click', ()=>{
    if (locationInput.checkValidity()) {
        openModal();
    } else {
        console.log('Invalid input. Please enter a valid location.');
    }

});


function closeModal() {
    modal.style.display = 'none';
  }

function openModal(e) {
    // e.preventDefault();
    modal.style.display = 'block';
    GetData();
  }

function GetData(){
    // console.log('fetched!');
    const apiKey = 'dc27680fbc2d439e8db62604230108' ;
    const location = document.querySelector('#locationInput').value.toUpperCase();
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;


    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            return response.json()
            // console.log (response.json)
        }
        else{
            throw new Error(response.statusText)
        }
    })
    .then(function(response){
        // console.log(response);
        const data = { 
            tempInC: response.current.temp_c,
            tempInF: response.current.temp_f,
            clouds: response.current.condition.text,
            country: response.location.country,
            time: response.location.localtime,
            windKph: response.current.wind_kph,
            windMph: response.current.wind_mph,
            humidity : response.current.humidity,
            windDir : response.current.wind_dir,
            Uv : response.current.uv, 
            feelslike_c :  response.current.feelslike_c,  
            feelslike_f :  response.current.feelslike_f,  
        };
        // console.log(data);
        DisplayData(location,data);
    })   
}



function DisplayData(location ,data){
    const weatherData = document.getElementById('weatherData');
    
    weatherData.innerHTML = `
    <h2>In ${location}, ${data.country} at ${data.time} </h2>
    <p>Temperature: ${data.tempInC}°C / ${data.tempInF}°F</p>
    <p>Feels Like: ${data.feelslike_c}°C / ${data.feelslike_f}°F</p>
    <p>Condition: ${data.clouds} </p>
    <p>Wind Speed: ${data.windKph} / ${data.windMph} </p>
    <p>Humidity: ${data.humidity} </p>
    <p>Wind Direction: ${data.windDir} </p> 
    <p>UV index: ${data.Uv} </p> 
    `
}

    