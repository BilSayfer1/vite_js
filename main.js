const header = document.getElementById('main-header');

const glavHeader = document.createElement('div');
glavHeader.className = 'glav_header';

const leftMenu = document.createElement('div');
leftMenu.className = 'left';

const mainLink = document.createElement('a');
mainLink.href = '#';
mainLink.textContent = 'Главная';

const walletsLink = document.createElement('a');
walletsLink.href = '#';
walletsLink.textContent = 'Мои Кошельки';

const transactionsLink = document.createElement('a');
transactionsLink.href = '#';
transactionsLink.textContent = 'Мои транкзакции';

transactionsLink.onclick = () => {
    location.assign('/pages/create_tranzaktions/')
}

leftMenu.append(mainLink);
leftMenu.append(walletsLink);
leftMenu.append(transactionsLink);

const rightMenu = document.createElement('div');
rightMenu.className = 'right';

const storedEmail = localStorage.getItem('email') || '';

const userEmailLink = document.createElement('a');
userEmailLink.href = '#';
userEmailLink.textContent = storedEmail;

const logoutIcon = document.createElement('img');
logoutIcon.src = '/images/icons8-выход-50.png';
logoutIcon.onclick = () => {
    localStorage.clear(); 
    location.assign('/pages/sign_in/');
}

rightMenu.append(userEmailLink);
rightMenu.append(logoutIcon);

glavHeader.append(leftMenu);
glavHeader.append(rightMenu);

header.append(glavHeader);

const container = document.getElementById('container');

const glavMain = document.createElement('div');
glavMain.className = 'glav_main';

const mainHeader = document.createElement('div');
mainHeader.className = 'main_header';

const welcomeMessage = document.createElement('h1');
welcomeMessage.textContent = 'Добро пожаловать, ';

const nameSpan = document.createElement('span');
nameSpan.textContent = `${localStorage.getItem('name')} ${localStorage.getItem('surname')}`;

welcomeMessage.append(nameSpan);

const emailLink = document.createElement('a');
emailLink.href = '#';
emailLink.textContent = localStorage.getItem('email');

mainHeader.append(welcomeMessage);
mainHeader.append(emailLink);

glavMain.append(mainHeader);
container.append(glavMain);

const cardsContainer = document.getElementById('cards-container');

const cardsMain = document.createElement('div');
cardsMain.className = 'cards_main';

const headerWallets = document.createElement('h1');
headerWallets.textContent = 'Мои кошельки';

const walletContainer = document.createElement('div');
walletContainer.className = 'wallet-container';

const viewAllLink = document.createElement('a');
viewAllLink.href = '#';
viewAllLink.className = 'no-underline';
viewAllLink.textContent = 'Смотреть все кошельки';

cardsMain.append(headerWallets);
cardsMain.append(walletContainer);
cardsMain.append(viewAllLink);

cardsContainer.append(cardsMain);

walletsLink.onclick = () => {
    location.assign('/pages/create_wallets/');
}

function loadWallets() {
    let wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    wallets.forEach(wallet => addWalletToContainer(wallet));
}

function addWalletToContainer(wallet) {
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