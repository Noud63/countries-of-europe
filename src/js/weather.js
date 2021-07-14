//Get weather
const key = process.env.API_KEY
export const getData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;

    try {
        let data = await axios(url)
        data = data
        console.log(data)
        let weather = {
            temp: data.data.list[0].main.temp.toFixed(),
            city: data.data.city.name,
            des: data.data.list[0].weather[0].description,
            icon: data.data.list[0].weather[0].icon,
            wind: data.data.list[0].wind.speed.toFixed()
        }

        document.querySelector('.weatherData').innerHTML =
            `<div>
                <div>Temperature: ${Math.round(weather.temp) + ' \xB0' + "C"}</div>
                <div>${weather.des}</div>
            </div>
             <div>
                <img src="http://openweathermap.org/img/w/${weather.icon}.png" class="icon">
            </div>
           `
    } catch (error) {
        console.log(error)
        document.querySelector('.weatherData').textContent = `Ooops no data!`
    }
}