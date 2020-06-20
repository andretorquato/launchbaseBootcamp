const programador = {
    
     nome:"André",
     idade: 18,
     tecnologias: [
         {nome: "Javascript", especialidade:"Front-end e Back-end"},
         {nome: "Python", especialidade:"IA"},
     ]
}

console.log(`O usuário ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`)