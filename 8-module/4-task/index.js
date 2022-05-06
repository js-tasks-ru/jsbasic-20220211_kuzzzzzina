import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if(!product) return

    if(product){
      let cartItem = this.cartItems.find(item => item.product.id == product.id);
      if(cartItem){
        cartItem.count++;
      } else {
        this.cartItems.push({product, count: 1})
      }
    this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;

    if (cartItem.count == 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalCount = 0;
    for (let product of this.cartItems) {
      totalCount += product.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0;
    for (let product of this.cartItems) {
      totalPrice += product.product.price * product.count;
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    let modalCart = createElement("<div> </div>");
    for (let i of this.cartItems) {
      modalCart.append(this.renderProduct(i.product, i.count));
    }
    modalCart.append(this.renderOrderForm());
    this.modal.setBody(modalCart);
    this.modal.open();

    document.querySelectorAll(".cart-product").forEach((item) => {
      item.addEventListener("click", (event) => {
        if (event.target.closest('.cart-counter__button_minus')) {
          this.updateProductCount(event.currentTarget.dataset.productId, -1);
        } else if (event.target.closest('.cart-counter__button_plus')) {
          this.updateProductCount(event.currentTarget.dataset.productId, 1);
        }
      });
    });

    let cartForm = modalCart.querySelector('.cart-form');
    cartForm.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    if (document.body.classList.contains("is-modal-open")) {
      for (let item of cartItem) {
        let productId = item.product.id;
        let modalBody = document.querySelector('.modal');
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        productCount.innerHTML = item.count;
        productPrice.innerHTML = `€${(item.product.price * item.count).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
      if (cartItem.length == 0) {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    let cartButton = document.querySelector('.cart-buttons__button');
    cartButton.classList.add('is-loading');

    let form = document.querySelector('.cart-form');
    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    });
    response.then(() => {
     // const modalTitle = document.querySelector('.modal__title');
     // modalTitle.removeChild(modalTitle.childNodes[0]);
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modal.setBody(createElement(
        `<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`)
      );
    });


  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

