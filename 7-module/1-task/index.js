import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(this.#template());
    this.buttonClick();
    this.activeRibbonItem()
  }

  #template(){
    return `
   <div class="ribbon">
    
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
    ${this.categories.map((item) => 
      `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`
      ).join('')}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    
    </div>
    `
  }

  buttonClick(){

    let ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');

    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
      btns()
    })

    ribbonArrowRight.addEventListener('click', () =>{
      ribbonInner.scrollBy(350, 0);
      btns()
    })
   
    //ribbonInner.addEventListener('scroll', () => {

    const btns = () =>{
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth; // число пикселей, например, 100 или 0.

      if(scrollLeft === 0){
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible')
      } else {
        ribbonArrowLeft.classList.add('ribbon__arrow_visible')
      } 
      
      if (scrollRight < 1) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible')
      } else {
        ribbonArrowRight.classList.add('ribbon__arrow_visible')
      }
    }

  }

  activeRibbonItem(){
    let ribbonItems = this.elem.querySelectorAll('.ribbon__item');

    ribbonItems.forEach((item)=> {
      item.addEventListener('click', (event)=> {
        ribbonItems.forEach((item)=> {
          item.classList.remove('ribbon__item_active');
        });
        
        let target = event.target;

        event.preventDefault();

        target.classList.add('ribbon__item_active');

        const ribbonItemEvent = new CustomEvent("ribbon-select", 
        { detail: target.getAttribute('data-id'),
        bubbles: true});

        return this.elem.dispatchEvent(ribbonItemEvent);
      });
    });
  }
  
}
