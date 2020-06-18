const user = {
    name: "André",
    transactions: [],
    balance: 0
}


function createTransaction(transaction) {
    const addTransactionArray = user.transactions.push(transaction)

    if (transaction.type == "debit") {
        user.balance -= transaction.value
    } else {
        user.balance += transaction.value
    }


}

function getHigherTransactionByType(type) {
    let higherTransaction
    let higherValue = 0;

    for (transaction of user.transactions) {
        if (transaction.type == type && transaction.value > higherValue) {
            higherValue = transaction.value
            higherTransaction = transaction
        }
    }
    return higherTransaction
}

function getAverageTransactionValue() {
    let sum = 0;
    for (transaction of user.transactions) {
        sum += transaction.value
    }
    return sum / user.transactions.length
}
function getTransactionsCount() {
    let count = {
        credit: 0,
        debit: 0
    }
    for (transaction of user.transactions) {
        if (transaction.type == "credit") {
            count.credit++
        } else {
            count.debit++
        }
    }
    return count
}

createTransaction({ type: "credit", value: 200 });
createTransaction({ type: "debit", value: 400 });
createTransaction({ type: "debit", value: 100});
createTransaction({ type: "credit", value: 800 });

console.log(user.balance)
console.log(getHigherTransactionByType("debit"))
console.log(getHigherTransactionByType("credit"))
console.log(getAverageTransactionValue())
console.log(getTransactionsCount())
