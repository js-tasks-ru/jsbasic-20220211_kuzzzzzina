import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  constructor({ steps, value = 0 }) {
   
      this.steps = steps;
      this.value = value;
      this.elem = createElement(this.#template()); 
      this.action()
      this.clickEvent()
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
  
    action(){
      
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    
    thumb.addEventListener('pointerdown', (event) => {
      console.log('pointer');
      event.preventDefault();
      
      const onmove = (event) => {
        console.log('move')

        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }
        
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        
        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        this.value = Math.round(approximateValue);

        this.elem.classList.add('slider_dragging');
        this.elem.querySelector(".slider__steps").children[this.value].classList.add('slider__step-active');

        let progress = this.elem.querySelector('.slider__progress');
        let leftPercents = leftRelative * 100;

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        let sliderValue = this.elem.querySelector('.slider__value');
        sliderValue.innerHTML = this.value;
    
        //console.log('move2')
        
      }

      const pointerUp = () => {
        document.removeEventListener('pointermove', onmove);
        document.removeEventListener('pointerup', pointerUp);

        this.elem.classList.remove('slider_dragging');

        let valuePercents = this.value /(this.steps - 1) * 100;

        thumb.style.left = `${valuePercents}%`;
        this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

        //console.log('up');
        
        this.сustomEvent();
      } //{once: true}

      document.addEventListener('pointermove', onmove);
      document.addEventListener('pointerup', pointerUp);
    })
  }


  clickEvent(){
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

    сustomEvent() {
      const event = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(event)
    }

  }


