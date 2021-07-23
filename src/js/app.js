import { countries } from './countries.js'
import { getData } from './weather.js'
import { images, country, flags } from './assets.js'


let index = 0
let count = 1


//Preload images for faster rendering
window.onload = function () {

    const europeMap = []
    for (let pic of countries) {
        const photo = pic.imagebig.split("/")[1]
        europeMap.push(photo)
    }

    const pics = [...europeMap, ...images]

    for (var i = 0; i < pics.length; ++i) {
        let imageObject = new Image();
        imageObject.onload = function () {
            console.log(`${pics.length} images loaded!`);
        }
        imageObject.src = `images/${pics[i]}`;
    }
}


init()


//render title, flag and city pic
function addHeader() {
    document.querySelector('.bgImg').innerHTML = `<img src=images/${images[index]} class="bgImage">`;
    document.querySelector('.country').textContent = count + ". " + country[index];
    document.querySelector('.flag').innerHTML = `<img src=flags/${flags[index]}  style="width: 30px; display:block;">`
}


//render info on country
function addInfo() {
    document.querySelector('.information').innerHTML =
        `<div>Capital: ${countries[index].capital}</div>
         <div>Population: ${countries[index].population}</div>
         <div>Language: ${countries[index].language}</div>
         <div>Currency: ${countries[index].currency}</div>`
}


//render miniature map of europe
function mapOfEurope() {
    document.querySelector('.map').innerHTML = `<img src="${countries[index].image}" class="mapSmall">`
}


//render weather info
function getWeatherData() {
    document.querySelector('.weatherHeader').textContent = `Current weather for: ${countries[index].capital}`
    const weather = getData(`${countries[index].capital}`)
    return weather
}


//Next and previous button functionality
const buttons = [...document.querySelectorAll('.btn')]
buttons.forEach(button => {

    button.addEventListener('click', function (e) {
        if (e.target.textContent === "next") {
            index++
            count++
        }
        if (e.target.textContent === "prev") {
            index--
            count--
        }
        if (index > images.length - 1) {
            index = 0
            count = 1
        }
        if (index < 0) {
            index = images.length - 1
            count = images.length
        }

        addHeader()
        mapOfEurope()
        addInfo()
        getWeatherData()

    })
})


//Show map of europe enlarged
const element = document.querySelector('.map')
element.addEventListener('click', showPopup)
function showPopup(e) {
    if (e.target) {
        document.querySelector('.mapOverlay').style.display = "flex";
        document.querySelector('.mapOverlay').innerHTML = `<img src="${countries[index].imagebig}" class="popup">`
    }
}


const element2 = document.querySelector('.mapOverlay')
element2.addEventListener('click', hidePopup)
function hidePopup(e) {
    if (e.target) {
        document.querySelector('.mapOverlay').style.display = "none";
        document.querySelector('.mapOverlay').innerHTML = ""
    }
}


//Initial state of app
function init() {
    addHeader()
    mapOfEurope()
    addInfo()
    getWeatherData()
}

