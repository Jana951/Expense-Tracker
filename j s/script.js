let form = document.getElementById("ss");
let description = document.getElementById("cc");
let amount = document.getElementById("dd");
let list = document.getElementById("list");
let balance = document.getElementById("magic");
let income = document.getElementById("money-plus");
let expense = document.getElementById("money-minus");
let transactions = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let text = description.value;
  let amt = Number(amount.value);

  if (text === "" || amount.value === "" || isNaN(amt)) {
    alert("Please enter valid text and amount");
    return;
  }
  let transaction = {
    id: Date.now(),
    text: text,
    amount: amt
  };
  transactions.push(transaction);
  description.value = "";
  amount.value = "";
  updateUI();
});
function updateUI() {
  list.innerHTML = "";
  transactions.forEach(function (tran) {
    let sign = tran.amount < 0 ? "-" : "+";
    let li = document.createElement("li");
    li.className = tran.amount < 0 ? "minus" : "plus";
    li.innerHTML = `
      ${tran.text}
      <span>${sign}$${Math.abs(tran.amount)}</span>
      <button class="delete-btn" onclick="deleteItem(${tran.id})">x</button>
    `;
    list.appendChild(li);
  });

  updateTotals();
}
function deleteItem(id) {
  transactions = transactions.filter(function (tran) {
    return tran.id !== id;
  });   
  updateUI();
}
function updateTotals() {
  let amounts = transactions.map(tran => tran.amount);
  let total = amounts.reduce((acc, val) => acc + val, 0);
  let incomeTotal = amounts.filter(val => val > 0).reduce((a, b) => a + b, 0);
  let expenseTotal = amounts.filter(val => val < 0).reduce((a, b) => a + b, 0);
  balance.innerText = `$${total}`;
  income.innerText = `+$${incomeTotal}`;
  expense.innerText = `-$${Math.abs(expenseTotal)}`;
}
