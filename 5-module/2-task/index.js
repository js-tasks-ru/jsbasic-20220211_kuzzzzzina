function toggleText() {
  // ваш код...

  let button = document.querySelector('.toggle-text-button');

  button.addEventListener("click", handler);
 
  function handler() {
      text.hidden = !text.hidden;
  }

  
}
