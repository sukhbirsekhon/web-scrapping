const request = require('request');

const current = document.getElementById(`current`);
const open = document.getElementById(`open`);
const high = document.getElementById(`high`);
const low = document.getElementById(`low`); 
const states = document.getElementById(`state`); 
const cases = document.getElementById(`case`); 
const death = document.getElementById(`death`); 


/**
 * This is a function to extract specific stock quote details
 */
function aapl() {
  request(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=brcpu1vrh5rcn6su4e9g`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    current.innerHTML = `Current Price: ` + body.c;
    open.innerHTML = `Open Price: ` + body.o;
    high.innerHTML = `High Price: ` + body.h;
    low.innerHTML = `Low Price: ` + body.l;
  });
}
aapl();

/**
 * This function extracts covid19 USA states data
 */
function covid() {
  request('https://finnhub.io/api/v1/covid19/us?token=brcpu1vrh5rcn6su4e9g', { json: true }, (err, res, body) => {
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