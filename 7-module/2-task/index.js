import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(this.#template());
    

  }

#template(){
 return ` 
    <div class="modal">
      
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
            <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
           
          </h3>
        </div>

        <div class="modal__body">
          
        </div>
      </div>

    </div>
  `
}

open() {
  document.body.append(this.elem);
  document.body.classList.add('is-modal-open');
  this.buttonClick();
  
}

setTitle(title) {
this.elem.querySelector('.modal__title').textContent = title;
}

setBody(modalBodyNode){
  let modalBody = this.elem.querySelector('.modal__body');
  modalBody.innerHTML = '';
  modalBody.append(modalBodyNode);
}

close() {
  this.elem.remove();
  document.body.classList.remove('is-modal-open');
  document.removeEventListener('keydown', this.escEvent)
}

buttonClick() {
let modalClose = this.elem.querySelector('.modal__close');
modalClose.addEventListener('click', ()=> {
  this.close()
}) 
document.addEventListener('keydown', this.escEvent)
}

escEvent = (event) => {
if(event.code == "Escape") this.close()
}


}
