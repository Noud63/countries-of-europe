import { countries } from './countries.js'
import { getData } from './weather.js'
import { images, country, flags } from './assets.js'

let index = 0
let count = 1


//Preload imagebig images from countries for better UX
for (var i = 0; i < countries.length; ++i) {
    let img = new Image();
    img.src = countries[i].imagebig;
    console.log(img.src)
}


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
        `<div>Capital: ${countries[index].capital}</div>
         <div>Population: ${countries[index].population}</div>
         <div>Language: ${countries[index].language}</div>
         <div>Currency: ${countries[index].currency}</div>
        `
    document.querySelector('.map').innerHTML = `<img src="${countries[index].image}" id="${index}">`
    document.querySelector('.weatherHeader').textContent = `Current weather for: ${countries[index].capital}`
    getData(`${countries[index].capital}`)
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


//Mouseover and mouseout pop-up functionality on map of europe
// const element = document.querySelector('.map')
// const events = ["mouseenter", "mouseleave"]
// events.forEach(event => {
//     element.addEventListener(event, function (e) {

//         if (event === "mouseenter") {
//             document.querySelector('.mapOverlay').style.display = "flex";
//             document.querySelector('.mapOverlay').innerHTML = `<img src="${countries[index].imagebig}">`
//         }

//         if (event === "mouseleave") {
//             document.querySelector('.mapOverlay').style.display = "none";
//         }
//     })
// })


const element = document.querySelector('.map')

element.addEventListener('mouseenter', showPopup)
function showPopup(e) {
    if (e.target) {
        document.querySelector('.mapOverlay').style.display = "flex";
        document.querySelector('.mapOverlay').innerHTML = `<img src="${countries[index].imagebig}" class="popup">`
    }

}

element.addEventListener('mouseout', hidePopup)
function hidePopup(e) {
    if (e.target) {
        document.querySelector('.mapOverlay').style.display = "none";
        document.querySelector('.mapOverlay').innerHTML = ""
    }

}




// const el = document.querySelector('.mapOverlay')
// for (let i = 0; i < countries.length; i++) {
//     const map = document.createElement('div')
//     const popup = document.createElement('img')
//     popup.className = "bigPic"
//     map.className = "popup"
//     map.id = i
//     popup.src = countries[i].imagebig;
//     map.appendChild(popup)
//     el.appendChild(map);
// }





// Preload images
//https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript