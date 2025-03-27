'use strict';
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.close-modal')
const btnOpenModal = document.querySelectorAll('.show-modal')

for (let i = 0; i < btnOpenModal.length; i++)
    btnOpenModal[i].addEventListener('click', function () {
        modal.classList.remove('hidden')
        overlay.classList.remove('hidden')
    })


const closemodal = () =>{
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
btnCloseModal.addEventListener('click',closemodal)

overlay.addEventListener('click', closemodal)

document.addEventListener('keydown',closemodal)