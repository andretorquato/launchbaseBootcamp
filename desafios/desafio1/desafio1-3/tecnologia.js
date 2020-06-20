const users= [
    {name:"Carlos", technologies: ["HTML", "CSS", "Python"] },
    {name:"Jasmine", technologies: ["Javascript", "CSS","React"] },
    {name:"Tuane", technologies: ["HTML", "Node.js"] }
]
// Estrutura de repetição para imprimir nome dos usuarios e suas tecnoligias que ultiliza 
for(let user of users){
    console.log(`${user.name} trabalha com ${user.technologies}`)
}

// Testa sé contem a string "CSS" dentro do array e retornar true or false
function checkUserUseCSS(user){
    for(let technologies of user.technologies){
        if(technologies == "CSS"){
            return true
        }
    }
    return false
}
// Faz a repetição para testar cada usuario usando a função acima
for(let i = 0; i < users.length; i++){
    const userJobWithCSS = checkUserUseCSS(users[i])
    if(userJobWithCSS){
        console.log(`O usuário ${users[i].name} trabalha com CSS`)
    }
}