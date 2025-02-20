// Select Elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Transactions Array
let transactions = [];

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter a valid description and amount.");
        return;
    }

    // Create Transaction Object
    const transaction = {
        id: generateID(),
        text: text.value,
        amount: parseFloat(amount.value), // Convert amount to a number
    };

    // Push transaction to array
    transactions.push(transaction);

    console.log("Transaction Added:", transaction);
    console.log("Transactions Array:", transactions);

    // Update UI
    addTransactionDOM(transaction);
    updateValues();

    // Clear input fields
    text.value = "";
    amount.value = "";
}

// Generate Unique ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Add Transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Remove Transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    console.log("Transactions After Removal:", transactions);
    init();
}

// Update Balance, Income, and Expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Initialize App
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Event Listener for Form Submission
form.addEventListener("submit", addTransaction);
