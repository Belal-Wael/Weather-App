
let nameInput=document.getElementById('place');
let region=document.getElementById('region');


// toggle menue part

document.getElementById('toggle-btn').addEventListener('click', function() {
    let menu = document.querySelector('main header .nav');
    let computedStyle = window.getComputedStyle(menu); // method gets the computed CSS properties and values of an HTML element.

    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        setTimeout(function() {
            menu.style.display = 'none';
        }, 300); 
    } else {
        menu.style.display = 'block';
        setTimeout(function() {
            menu.classList.add('show');
        }, 10); 
    }
});



const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// call Api

async function getCountryState(name){
    var apiInfo=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1007aec67a104bd7aea84321242005&q=${name}&days=3`);
    if (apiInfo.ok && apiInfo.status !== 400) { 
        const data = await apiInfo.json();
        displayCurrentDay(data.location,data.current); 
        displayAnotherDays(data.forecast.forecastday);
        console.log(data.forecast.forecastday);
    }
}


nameInput.addEventListener('keyup',function(eventInfo){
    getCountryState(eventInfo.target.value) 
})

// display weather of the current day
function displayCurrentDay(location,current){
    if(current!=null){
        const lastUpdated = new Date(current.last_updated.replace(" ", "T"));
        //monday
        console.log(lastUpdated.getDate());
        document.getElementById('day').innerHTML= days[lastUpdated.getDay()];
        // 17 may
        document.getElementById('month').innerHTML= lastUpdated.getDate()+monthNames[lastUpdated.getMonth()];
        // location
        document.getElementById('region').innerHTML=location.name;
        //temp
        document.getElementById('temp').innerHTML=`${current.temp_c}<sup>o</sup>C`;
        //iocn
        document.getElementById('icon').innerHTML=`<img src="https:${current.condition.icon}" alt="">`;
        //custom
        document.getElementById('addtion').innerHTML=current.condition.text;

    }
}



// display weather of the another days.

function displayAnotherDays(forecastDays){
   let id='anotherDay';
    let container=``;
    for (let i = 1; i < forecastDays.length; i++) {
        
        const day = new Date(forecastDays[i].date.replace(" ", "T")).getDay();
        
        container+=` <div class="wHeader">${days[day]}</div>
        <div class="wContent">
            <div class="logo"><img src="https:${forecastDays[i].day.condition.icon}" alt=""></div>
            <div class="num" >
            ${forecastDays[i].day.maxtemp_c}
                <sup>o</sup>
                c
            </div>
            <small>${forecastDays[i].day.mintemp_c}
                <sup>o</sup>
            </small>
            <div class="state" >${forecastDays[i].day.condition.text}</div>
        </div>`
        // document.getElementById('day2').innerHTML= `${days[day]}`;
        // document.getElementById('icon2').innerHTML=`<img src="https:${forecastDays[i].day.condition.icon}" alt="">`;
        // document.getElementById('temp2').innerHTML=`${forecastDays[i].day.maxtemp_c}<sup>o</sup>c</div>
        // <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>`;
        // document.getElementById('state2').innerHTML= `${forecastDays[i].day.condition.text}`;
        if(i==1){
            document.getElementById('anotherDay').innerHTML=container;
            container=``; // empty 
        }
        else{
            document.getElementById('anotherDay1').innerHTML=container;
            console.log(2) // to test
        }
    }
    
}

