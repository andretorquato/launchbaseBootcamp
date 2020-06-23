const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const images = document.querySelector('.cards')
const modal = document.querySelector('.modal')

for(let card of cards){
    card.addEventListener("click", function(){
        const course = card.getAttribute('id')
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${course}`
        modalOverlay.classList.remove("hide")
        images.classList.add("hide")
        
    })
}
document.querySelector('.maximize-modal').addEventListener("click", function(){
  
    if(modal.classList.value === "modal"){
        modal.classList.add('maximize')
       
    }else{
        modal.classList.remove('maximize')
       
    }
})

document.querySelector('.close-modal').addEventListener("click", function(){
    modalOverlay.classList.add('hide')
    images.classList.remove("hide")
   modalOverlay.querySelector('iframe').src = ''
})

