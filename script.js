const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const BaseURL = "https://open.er-api.com/v6/latest/";
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
const swapIcon = document.querySelector(".fa-arrow-right-arrow-left");

// Populate dropdowns with currency codes
dropdowns.forEach((select) => {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && newOption.value === 'USD') {
            newOption.selected = "selected";
        } else if (select.name === 'to' && newOption.value === 'INR') {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change', (event) => {
        updateFlag(event.target);
    });
});

let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Swap currencies and flags
swapIcon.addEventListener('click', () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    swapIcon.classList.add('spin');
    setTimeout(() => swapIcon.classList.remove('spin'), 700);
    msg.innerText = ""; // Clear previous message
});

// Handle conversion
btn.addEventListener('click', async (event) => {
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value.trim();

    // Validation
    if (!amtval || isNaN(amtval) || Number(amtval) <= 0) {
        msg.innerText = "Please enter a valid amount.";
        msg.style.color = "#db2777";
        return;
    }

    msg.innerText = "Fetching rate...";
    msg.style.color = "#db2777";
    msg.classList.remove("fade-in");

    try {
        let URL = `${BaseURL}${fromCurr.value}`;
        let response = await fetch(URL);
        let data = await response.json();

        if (data.result !== "success") {
            throw new Error("API error");
        }

        let rate = data.rates[toCurr.value];
        if (!rate) {
            msg.innerText = "Currency not supported.";
            return;
        }

        let converted = (amtval * rate).toFixed(2);

        msg.innerText = `${amtval} ${fromCurr.value} = ${converted} ${toCurr.value}`;
        msg.style.color = "#db2777";
        msg.classList.add("fade-in");
    } catch (err) {
        msg.innerText = "Failed to fetch rates. Try again!";
        msg.style.color = "red";
    }
});


