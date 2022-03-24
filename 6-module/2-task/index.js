import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  product = {};

  constructor(product) {
    this.product = product
    this.name = product.name
    this.price = product.price
    this.image = product.image

    this.elem = createElement(this.#template())
    this.buttonClick()
  }
 /*get elem() {
    return this.container;
}*/
  
  #template(){
    return `
  <div class="card">
        <div class="card__top">
        <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
        <span class="card__price">€${this.price.toFixed(2)}</span>
        </div>

        <div class="card__body">
        <div class="card__title">${this.name}</div>
   
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div> 
  </div>`;
  }


  buttonClick(){
  let cardButton = this.elem.querySelector('.card__button');

  cardButton.addEventListener('click', () =>
    this.buttonClickEvent(cardButton));
  }

  buttonClickEvent(cardButton){
  let event = new CustomEvent("product-add", {
    detail: this.product.id,
    bubbles: true
  });
  cardButton.dispatchEvent(event);
  }
  

}

  /*
  new CustomEvent("product-add", { // имя события должно быть именно "product-add"
    detail: this.product.id, // Уникальный идентификатора товара из объекта товара
    bubbles: true // это событие всплывает - это понадобится в дальнейшем
}
*/
