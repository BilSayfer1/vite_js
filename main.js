
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

leftMenu.append(mainLink);
leftMenu.append(walletsLink);
leftMenu.append(transactionsLink);

const rightMenu = document.createElement('div');
rightMenu.className = 'right';

const storedEmail = localStorage.getItem('email') 

const userEmailLink = document.createElement('a');
userEmailLink.href = '#';
userEmailLink.textContent = storedEmail;

const logoutIcon = document.createElement('img');
logoutIcon.src = '/images/icons8-выход-50.png';
logoutIcon.onclick = () => {
    location.assign('/pages/sign_in/')
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
nameSpan.textContent = localStorage.getItem('name') + " " + localStorage.getItem('surname');

welcomeMessage.append(nameSpan);

const emailLink = document.createElement('a');

emailLink.href = '#';
emailLink.textContent = localStorage.getItem('email')

mainHeader.append(welcomeMessage);
mainHeader.append(emailLink);

glavMain.append(mainHeader);

container.append(glavMain);


const cardsContainer = document.getElementById('cards-container');

const cardsMain = document.createElement('div');
cardsMain.className = 'cards_main';

const headerr = document.createElement('h1');
headerr.textContent = 'Мои кошельки';

const walletContainer = document.createElement('div');
walletContainer.className = 'wallet-container';

const createWalletItem = (className, currency) => {
    const walletItem = document.createElement('div');
    walletItem.className = `wallet-item ${className}`;

    const cardType = document.createElement('div');
    cardType.textContent = 'VISA';

    const cardCurrency = document.createElement('div');
    cardCurrency.textContent = currency;

    walletItem.append(cardType);
    walletItem.append(cardCurrency);

    return walletItem;
};

walletContainer.append(createWalletItem('visa-first', 'RUB'));
walletContainer.append(createWalletItem('visa-second', 'RUB'));
walletContainer.append(createWalletItem('visa-third', 'RUB'));
walletContainer.append(createWalletItem('visa-four', 'RUB'));

const viewAllLink = document.createElement('a');
viewAllLink.href = '#';
viewAllLink.className = 'no-underline';
viewAllLink.textContent = 'Смотреть все кошельки';

cardsMain.append(headerr);
cardsMain.append(walletContainer);
cardsMain.append(viewAllLink);

cardsContainer.append(cardsMain);


walletsLink.onclick = () => {
    location.assign('/pages/create_wallets/')
}


