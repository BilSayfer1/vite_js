import { base_url } from '/lib/http.js';

document.getElementById('walletForm').onsubmit = function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value.trim();
    let currency = document.getElementById('currency').value.trim();
    let total = document.getElementById('balance').value.trim()

    if (!name || !currency) {
        alert('Все поля должны быть заполнены');
        return;
    }

    let wallet = {
        name: name,
        currency: currency,
        balance: total
    };

    fetch(`${base_url}/wallets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wallet)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Кошелек создан', data);
        document.getElementById('walletForm').reset();
        saveWalletToLocalStorage(data);
        addWalletToContainer(data);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
};

function saveWalletToLocalStorage(wallet) {
    let wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    wallets.push(wallet);
    localStorage.setItem('wallets', JSON.stringify(wallets));
}

function addWalletToContainer(wallet) {
    const cardsContainer = document.getElementById('cards-container');
    
    const walletItem = document.createElement('div');
    walletItem.className = 'wallet-item';
    walletItem.style.backgroundColor = getRandomColor();
    
    const nameDiv = document.createElement('div');
    nameDiv.textContent = wallet.name;
    
    const currencyDiv = document.createElement('div');
    currencyDiv.textContent = wallet.currency;
    
    walletItem.appendChild(nameDiv);
    walletItem.appendChild(currencyDiv);
    
    cardsContainer.appendChild(walletItem);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

loadWallets();

function loadWallets() {
    let wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    wallets.forEach(wallet => addWalletToContainer(wallet));
}
