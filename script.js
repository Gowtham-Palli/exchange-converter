const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const BaseURL ="https://open.er-api.com/v6/latest/";
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg =document.querySelector(".msg");

dropdowns.forEach((select)=>{
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==='from' && newOption.value==='USD'){
            newOption.selected="selected";
        }else if(select.name==='to' && newOption.value==='INR'){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change',(event)=>{
        updateFlag(event.target);
    })
})

let updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src= `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener('click', async(event)=>{
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval =amount.value;
    let URL = `${BaseURL}${fromCurr.value}`
    let response = await fetch(URL);
    let data = await response.json();
    
    msg.innerText = `${amtval} ${fromCurr.value} = ${amtval * data.rates[toCurr.value]} ${toCurr.value}`;
    
})





