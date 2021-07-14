// https://flagpedia.net/index
// https://unsplash.com/s/photos/europe?orientation=landscape

import { countries } from './countries.js'
import { getData } from './weather.js'
import { images, country, flags } from './assets.js'

let index = 0
let count = 1

//add title flag and city pic
function addHeader() {
    document.querySelector('.bgImg').innerHTML = `<img src=images/${images[index]} class="bgImage">`;
    document.querySelector('.country').textContent = count + ". " + country[index];
    document.querySelector('.flag').innerHTML = `<img src=flags/${flags[index]}  style="width: 30px; display:block;">`
}
addHeader()


//add country's info
function addInfo() {
    document.querySelector('.information').innerHTML =
        `<div>Capitol: ${countries[index].capitol}</div>
         <div>Population: ${countries[index].population}</div>
         <div>Language: ${countries[index].language}</div>
         <div>Currency: ${countries[index].currency}</div>
        `
    document.querySelector('.map').innerHTML = `<img src="${countries[index].image}">`
    document.querySelector('.weatherHeader').textContent = `Current weather for: ${countries[index].capitol}`
    getData(`${countries[index].capitol}`)
}
addInfo()


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

        addInfo()
        addHeader()
    })
})


// Replace next and prev button at screen-width < 500 
window.addEventListener("resize", function () {
    if (window.innerWidth <= 500) {
        document.getElementById('prev').classList.remove("prevBtn");
        document.getElementById('next').classList.remove("nextBtn");
    } else {
        document.getElementById('prev').classList.add("prevBtn");
        document.getElementById('next').classList.add("nextBtn");
    }
});


// Mouseover and mouseout pop-up functionality on map of europe
const element = document.querySelector('.map')
const events = ["mouseover", "mouseout"]
events.forEach(event => {
    element.addEventListener(event, function () {
        if (event === "mouseover") {
            document.querySelector('.mapOverlay').style.display = "flex";
            document.querySelector('.mapOverlay').innerHTML = `<img src="${countries[index].imagebig}" class="mapPopup" >`
        };

        if (event === "mouseout") {
            document.querySelector('.mapOverlay').style.display = "none";
        }
    })
})

