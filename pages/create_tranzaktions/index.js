import { postRequest } from '/lib/http.js';

let form = document.getElementById('transactionForm');
let walletInput = document.getElementById('wallet');
let amountInput = document.getElementById('amount');
let categoryInput = document.getElementById('category');
let transactionsTable = document.getElementById('transactionsTable');

form.onsubmit = async function(event) {
    event.preventDefault();
    let walletName = walletInput.value.trim();
    let amount = parseFloat(amountInput.value.trim());
    let category = categoryInput.value.trim();

    if (!walletName || isNaN(amount) || !category) {
        alert('Все поля должны быть заполнены');
        return;
    }

    let transaction = {
        wallet: walletName,
        amount: amount,
        category: category,
        date: new Date().toISOString()
    };

    try {
        console.log('Sending request to create transaction:', transaction);
        const data = await postRequest('/tanzaktions', transaction);

        if (!data) {
            throw new Error('Failed to create transaction');
        }

        console.log('Transaction created:', data);
        appendTransactionToTable(data);
        document.getElementById('transactionForm').reset();
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

function appendTransactionToTable(transaction) {
    const row = document.createElement('div');
    row.className = 'row';

    const idCell = document.createElement('div');
    idCell.className = 'cell';
    idCell.textContent = transaction.id;

    const walletCell = document.createElement('div');
    walletCell.className = 'cell';
    walletCell.textContent = transaction.wallet;

    const categoryCell = document.createElement('div');
    categoryCell.className = 'cell';
    categoryCell.textContent = transaction.category;

    const amountCell = document.createElement('div');
    amountCell.className = 'cell';
    amountCell.textContent = transaction.amount;

    const dateCell = document.createElement('div');
    dateCell.className = 'cell';
    dateCell.textContent = new Date(transaction.date).toLocaleString();

    row.appendChild(idCell);
    row.appendChild(walletCell);
    row.appendChild(categoryCell);
    row.appendChild(amountCell);
    row.appendChild(dateCell);

    transactionsTable.appendChild(row);
}
