import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.elem = createElement(this.#template());
    this.value = value; 
    this.addListener()
  }

  #template(){
    return`
    <div class="slider">

      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>

      <div class="slider__progress"></div>

      <div class="slider__steps">
      ${this.#templateSteps()}
      </div>
    </div>
    `;
  }

  #templateSteps(){
    let span = '';
    for (let i = 0; i < this.steps; i++) {
      span += '<span></span>';
    }
    return span
  }

  addListener(){
    this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');

    this.elem.addEventListener('click', (event) => {
      this.activeStep(event);
    });
  }

  activeStep = (event) => {
    
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    
    this.elem.querySelector('.slider__value').innerHTML = value;
    
    let valuePercents = value /segments * 100;

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');

    sliderThumb.style.left = `${valuePercents}%`;
    sliderProgress.style.width = `${valuePercents}%`;
    

    let sliderEvent = new CustomEvent('slider-change', { 
      detail: value, 
      bubbles: true 
    });
    this.elem.dispatchEvent(sliderEvent); 

  }
  
}
