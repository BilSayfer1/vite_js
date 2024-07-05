import { base_url } from '/lib/http.js';

let transactionForm = document.getElementById('transactionForm');
let rowCont = document.querySelector('.row_cont');
let amountInput = document.getElementById('amount');

transactionForm.onsubmit = function(event) {
    event.preventDefault();

    let wallet = document.getElementById('wallet').value.trim();
    let amount = parseFloat(document.getElementById('amount').value.trim());
    let category = document.getElementById('category').value.trim();

    if (wallet === '' || isNaN(amount) || category === '') {
        alert('Заполните все поля');
        return;
    }

    fetch(base_url + "/wallets?name=" + wallet)
        .then(response => response.json())
        .then(wallets => {
            if (wallets.length === 0) {
                alert('Кошелек не найден');
                return;
            }

            let walletObj = wallets[0];

            if (walletObj.balance < amount) {
                amountInput.style.border = '2px solid red';
                alert('Недостаточно средств');
                return;
            } else {
                amountInput.style.border = '';

                let transaction = {
                    id: crypto.randomUUID(),
                    wallet_name: wallet,
                    category: category,
                    total_trank: amount,
                    chislo: new Date().toISOString()
                };

                fetch(base_url + "/tanzaktions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(transaction)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Транзакция создана', data);
                    addTransactionRow(data);

                    walletObj.balance -= amount;

                    fetch(base_url + "/wallets/" + walletObj.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(walletObj)
                    })
                    .then(response => response.json())
                    .then(updatedWallet => {
                        console.log('Баланс обновлен', updatedWallet);
                        updateWalletInLocalStorage(updatedWallet);
                    })
                    .catch(error => {
                        console.error('Ошибка обновления баланса:', error);
                    });
                })
                .catch(error => {
                    console.error('Ошибка создания транзакции:', error);
                });
            }
        })
        .catch(error => {
            console.error('Ошибка получения кошелька:', error);
        });
};

function addTransactionRow(transaction) {
    const row = document.createElement('div');
    row.className = 'row';

    const idCell = document.createElement('div');
    idCell.className = 'cell';
    idCell.textContent = transaction.id;

    const walletCell = document.createElement('div');
    walletCell.className = 'cell';
    walletCell.textContent = transaction.wallet_name;

    const categoryCell = document.createElement('div');
    categoryCell.className = 'cell';
    categoryCell.textContent = transaction.category;

    const amountCell = document.createElement('div');
    amountCell.className = 'cell';
    amountCell.textContent = transaction.total_trank;

    const dateCell = document.createElement('div');
    dateCell.className = 'cell';
    dateCell.textContent = formatDate(transaction.chislo);

    row.append(idCell, walletCell, categoryCell, amountCell, dateCell);

    rowCont.append(row);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

function updateWalletInLocalStorage(updatedWallet) {
    let wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    let walletIndex = wallets.findIndex(wallet => wallet.id === updatedWallet.id);
    if (walletIndex !== -1) {
        wallets[walletIndex] = updatedWallet;
        localStorage.setItem('wallets', JSON.stringify(wallets));
    }
}