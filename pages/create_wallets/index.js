import { getRequest, postRequest, deleteRequest } from '/lib/http.js';

let form = document.getElementById('walletForm');
form.onsubmit = async function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value.trim();
    let currency = document.getElementById('currency').value.trim();
    let balance = parseFloat(document.getElementById('balance').value.trim());

    console.log('Form data:', { name, currency, balance });

    if (!name || !currency || isNaN(balance)) {
        alert('Все поля должны быть заполнены');
        return;
    }

    let wallet = {
        name: name,
        currency: currency,
        balance: balance
    };

    try {
        console.log('Sending request to create wallet:', wallet);
        const data = await postRequest('/wallets', wallet);

        if (!data) {
            throw new Error('Failed to create wallet');
        }

        console.log('Wallet created:', data);
        document.getElementById('walletForm').reset();
        saveWalletToLocalStorage(data);
        addWalletToContainer(data);
    } catch (error) {
        console.log('Ошибка:', error);
    }
};

function saveWalletToLocalStorage(wallet) {
    let wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    wallets.push(wallet);
    localStorage.setItem('wallets', JSON.stringify(wallets));
}

function addWalletToContainer(wallet) {
    if (!wallet || !wallet.name || !wallet.currency) {
        return;
    }

    const cardsContainer = document.getElementById('cards-container');
    
    const walletItem = document.createElement('div');
    walletItem.className = 'wallet-item';
    walletItem.style.backgroundColor = getRandomColor();
    
    const nameDiv = document.createElement('div');
    nameDiv.textContent = wallet.name;
    
    const currencyDiv = document.createElement('div');
    currencyDiv.textContent = wallet.currency;
    
    const balanceDiv = document.createElement('div');
    balanceDiv.textContent = 'Баланс: ' + wallet.balance;
    
    walletItem.append(nameDiv);
    walletItem.append(currencyDiv);
    walletItem.append(balanceDiv);
    
    cardsContainer.append(walletItem);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function loadWallets() {
    let wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    wallets.forEach(wallet => addWalletToContainer(wallet));
}
loadWallets();
