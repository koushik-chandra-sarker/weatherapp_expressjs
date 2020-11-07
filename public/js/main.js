
const message = document.getElementById('message')
const searchBtn = document.getElementById("searchBtn")
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();
    let [day,month,date,year] = today.toDateString().split(' ');
    let time = today.toLocaleTimeString()
    document.getElementById('day').innerText= daysInWeek[today.getDay()]
    document.getElementById('today_date').innerText= `${date} | ${month}`


const getTemperature = async (e)=> {
    e.preventDefault()
    const cityName = document.getElementById("search_box").value;
    if (cityName ===""){
        message.classList.remove('data_hide')
        document.getElementById('tempData').classList.add('data_hide')
    }else{
        document.getElementById('message').classList.add('data_hide')
        try{
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b59d9911df95953e267b4224b1bc2f03`;
            const response = await fetch(url)
            const data = await response.json();
            console.log(data)
            document.getElementById('tempData').classList.remove('data_hide')
            document.getElementById('city').innerText = ` ${data.name} | ${data.sys.country}`
            document.getElementById('temp').innerHTML =`<span>${(data.main.temp-273.15).toFixed(2)}</span> <sup>o</sup>C`
            let weatherStatus =data.weather[0].main;
            const weatherIcon = document.getElementById('weatherIcon')
            if (weatherStatus === "Sun"){
                weatherIcon.innerHTML = `<i class="fas fa-sun" style="color: #f3f169"></i>`
            }
            else if (weatherStatus === "Clouds"){
                weatherIcon.innerHTML = `<i class="fas fa-cloud" style="color: #f4f4f4"></i>`
            }
            else if (weatherStatus === "Clear"){
                weatherIcon.innerHTML = `<i class="fas fa-cloud-sun" style="color: #f3f169"></i>`
            }else if (weatherStatus === "Haze"){
                weatherIcon.innerHTML = `<i class="fas fa-smog" style="color: #f4f4f4"></i>`
            }
            else if (weatherStatus === "Rain"){
                weatherIcon.innerHTML = '<i class="fas fa-cloud-rain" style="color: #f4f4f4"></i>'
            }else { weatherIcon.innerHTML = `<i class="fas fa-cloud" style="color: #f4f4f4"></i>`}
        }catch(e){
            document.getElementById('tempData').classList.add('data_hide')
            message.classList.remove('data_hide')
            document.getElementById('massageTitle').innerText = `Please The Enter City Name Correctly.`

        }

    }
}

searchBtn.addEventListener("click",getTemperature)