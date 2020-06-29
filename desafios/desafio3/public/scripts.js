const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const images = document.querySelector('.cards')
const modal = document.querySelector('.modal')

for(let card of cards){
    card.addEventListener("click", function(){
        const course = card.getAttribute('id')
        window.location = `/contents/${course}`
        
    })
}