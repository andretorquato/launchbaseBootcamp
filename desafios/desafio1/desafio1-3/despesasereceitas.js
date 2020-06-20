const users = [
    {
        name: "André",
        recipes: [115.3, 48.7, 98.3, 14.5],
        expenses: [85.3, 13.5, 19.9]
    },
    {
        name: "Felipe",
        recipes: [24.6, 214.3, 45.3],
        expenses: [185.3, 12.1, 120.0]
    },
    {
        name: "Jonas",
        recipes: [9.8, 120.3, 340.2, 45.3],
        expenses: [450.2, 29.9]
    }
]


function calculateBalance(recipes, expenses){
   let sumRecipes = sumNumbers(recipes)
   let sumExpenses = sumNumbers(expenses)

   return sumRecipes - sumExpenses

}

function sumNumbers(numbers){
  let sum = 0
    for(number of numbers){
        sum += number;
    }
    return sum
}
for(let user of users){
   const balance = calculateBalance(user.recipes, user.expenses)
   if(balance > 0){
       console.log(`${user.name} seu saldo é POSITIVO, no valor de: ${balance}`)
   }else{
       console.log(`${user.name} seu saldo é NEGATIVO no valor de ${balance}`)
   }
}

