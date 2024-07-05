import { base_url } from "/lib/http.js"
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');

async function fetchPaymentMethods() {
    try {
        const response = await fetch(`${base_url}/wallets`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayCardDetails(data[index]);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayCardDetails(method) {
    const cardDetails = document.getElementById('card-details');

    if (method) {
        const cardType = document.createElement('div');
        cardType.className = 'card-type';
        cardType.textContent = `${method.type} *${method.lastFour}`;

        const cardExpiry = document.createElement('div');
        cardExpiry.className = 'card-expiry';
        cardExpiry.textContent = `Expires ${method.expiry}`;

        cardDetails.appendChild(cardType);
        cardDetails.appendChild(cardExpiry);
    } else {
        cardDetails.textContent = 'Карта создана';
    }
}

fetchPaymentMethods();