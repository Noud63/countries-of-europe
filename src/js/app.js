// https://flagpedia.net/index
// https://unsplash.com/s/photos/europe?orientation=landscape

import { countries } from './countries.js'
import { getData } from './weather.js'

const images = ["city1.jpg", "city2.jpg", "city3.jpg", "city4.jpg", "city5.jpg", "city6.jpg", "city7.jpg", "city8.jpg", "city9.jpg", "city10.jpg"]
const country = ["Czech republic", "Germany", "The Netherlands", "Italy", "Belgium", "France", "Spain", "United Kingdom", "Switzerland", "Iceland"]
const flags = ["czech.png", "germany.png", "netherlands.png", "italy.png", "belgium.png", "france.png", "spain.png", "uk.png", "swiss.png", "iceland.png"]

let index = 0
let count = 1

//add title flag and city pic
function addHeader() {
    document.querySelector('.bgImg').innerHTML = `<img src=images/${images[index]} class="bgImage">`;
    document.querySelector('.country').textContent = count + ". " + country[index];
    document.querySelector('.flag').innerHTML = `<img src=flags/${flags[index]}  style="width: 30px; display:block;">`
}
addHeader()


//add info
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


window.addEventListener("resize", function () {
    if (window.innerWidth <= 500) {
        document.getElementById('prev').classList.remove("prevBtn");
        document.getElementById('next').classList.remove("nextBtn");
    } else {
        document.getElementById('prev').classList.add("prevBtn");
        document.getElementById('next').classList.add("nextBtn");
    }
});


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

