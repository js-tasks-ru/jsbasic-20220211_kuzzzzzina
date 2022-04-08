export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
      this.cartItems.forEach((item, index) => {
        if (item.product.id === productId) {
          item.count += amount;
        }
        if (item.count == 0) {
          this.cartItems.splice(index, 1);
        }
      });
  
      this.onProductUpdate(this.cartItems);

  }

  isEmpty() {
    // ваш код
    if (this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    // ваш код
    let totalCount = 0;
    for (let product of this.cartItems) {
      totalCount += product.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    // ваш код
    let totalPrice = 0;
    for (let product of this.cartItems) {
      totalPrice += product.product.price * product.count;
    }
    return totalPrice;
  
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

