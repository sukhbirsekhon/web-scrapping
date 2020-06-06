const request = require('request');
const Promise = require('es6-promise').Promise;

const current = document.getElementById(`current`);
const open = document.getElementById(`open`);
const high = document.getElementById(`high`);
const low = document.getElementById(`low`); 
const states = document.getElementById(`state`); 
const cases = document.getElementById(`case`); 
const death = document.getElementById(`death`); 
const location = document.getElementById(`location`);
const temperature = document.getElementById(`temp`);
const feels_like = document.getElementById(`feels_like`);
const temp_min = document.getElementById(`temp_min`);
const temp_max = document.getElementById(`temp_max`);
const sunrise = document.getElementById(`sunrise`);
const sunset = document.getElementById(`sunset`);

/**
 * This is a function to extract specific stock quote details
 */
function stock(companyName) {
  request(`https://finnhub.io/api/v1/quote?symbol=` + companyName + `&token=brcpu1vrh5rcn6su4e9g`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    current.innerHTML = `Current Price: ` + body.c;
    open.innerHTML = `Open Price: ` + body.o;
    high.innerHTML = `High Price: ` + body.h;
    low.innerHTML = `Low Price: ` + body.l;
  });
}
stock(`AAPL`);

/**
 * This function extracts covid19 USA states data
 */
function covid() {
  request(`https://finnhub.io/api/v1/covid19/us?token=brcpu1vrh5rcn6su4e9g`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 
  let i;
  for(i = 0; i < body.length; i++)
  {
    states.innerHTML += body[i].state + `<br />`;
    cases.innerHTML += body[i].case + `<br />`;
    death.innerHTML += body[i].death + `<br />`;
  }
  });
}
covid();

/**
 * This function retrieves weather info from the API for West chester, OH
 */
function temp() {
  request(`https://api.openweathermap.org/data/2.5/weather?q=WestChester,us&APPID=edcf745ab482c4e9a2b6a1747323e886`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  
  location.innerHTML = body.name;
  temperature.innerHTML = Math.ceil(tempConverter(body.main.temp));
  feels_like.innerHTML = `Feels like: ` + Math.ceil(tempConverter(body.main.feels_like));
  temp_min.innerHTML = `Min temp: ` + Math.ceil(tempConverter(body.main.temp_min));
  temp_max.innerHTML = `Max Temp: ` + Math.ceil(tempConverter(body.main.temp_max));
  sunrise.innerHTML = `Sunrise: ` + timeConverter(body.sys.sunrise);
  sunset.innerHTML = `Sunset: ` + timeConverter(body.sys.sunset);
  });
}
temp();

/**
 * Converts seconds in UTC to 24-hour time format
 * 
 * @param {*} time 
 */
function timeConverter(time) {
  const date = new Date(time * 1000);
  const hour = date.getHours();
  const min = `0`+ date.getMinutes();
  const sec = `0` + date.getSeconds();
  const formattedTime = hour + `:` + min.substr(-2) + `:` + sec.substr(-2);

  return formattedTime;
}

/**
 * Converts kelvin temperature to Fahrenheit
 * 
 * @param {*} temp 
 */
function tempConverter(temp) {
  const fahrenheitTemp = ((temp - 273.15) * (9/5)) + 32;
  return fahrenheitTemp;
}

/**
 * News api 
 * 
 * @param {*} category 
 * @param {*} country 
 */
function news(category, country) {

  request(`http://newsapi.org/v2/top-headlines?country=` + country + `&category=` + category + `&apiKey=e82c49ff8e464ab6b26a17b43d712d93`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    console.log(body.length);

    let i;
    for(i = 0; i < body.totalResults; i++){
      // title += body.articles[i].title;
      console.log(body.articles[i].title);
    }
  });
}
news(`business`, `us`);
