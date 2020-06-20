const nome = "Silvana"
const sexo = "F"
const idade = 48
const contribuicao = 23

const totalContribuicao = idade + contribuicao

// Tempo de contribuição do homem é 35 anos
const tempoDeContribuicaoHomem = 35
// Idade minima para homem aposentar 95 anos
// Homem aposentar
const homemAposentar = sexo == "M" && totalContribuicao >= 95 &&  contribuicao >= tempoDeContribuicaoHomem 
// Tempo de contribuição da mulher 30 anos 
const tempoDeContribuicaoMulher = 30 
// Idade minima para mulher aposentar 85 anos
// Mulher Aposentar
const mulherAposentar = sexo == "F" && totalContribuicao >= 85 &&  contribuicao >= tempoDeContribuicaoMulher
// Regra 85-95, soma da idade e sua contribuição do homem ter que ser 95 anos, enquanto da mulher 85 anos.

if(homemAposentar || mulherAposentar){
    console.log(`${nome}, Você já pode se aposentar`)
}else{
    console.log(`${nome}, Você ainda NÃO pode se aposentar`)
}
