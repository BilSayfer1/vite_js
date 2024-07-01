import { base_url } from '/lib/http.js';

let form = document.getElementById('transactionForm');
let row_cont = document.querySelector('.row_cont');

form.onsubmit = function(event) {
    event.preventDefault();

    let wallet = document.getElementById('wallet').value.trim();
    let amount = document.getElementById('amount').value.trim();
    let category = document.getElementById('category').value.trim();

    if (wallet === '' || amount === '' || category === '') {
        alert('Заполните все поля');
        return;
    }

    let transaction = {
        id: crypto.randomUUID(),
        wallet_name: wallet,
        category: category,
        total_trank: amount,
        chislo: new Date().toISOString()
    };

    console.log(transaction);

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
    })
    .catch(error => {
        console.error('Ошибка:', error);
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

    row_cont.append(row);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}
