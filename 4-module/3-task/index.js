function highlight(table) {
  let tbody = table.getElementsByTagName('tbody')[0];
  let tr = tbody.getElementsByTagName('tr');

  for(let i = 0; i < tr.length; i++) {
    
    let status = tr[i].cells[3];

    if(status.dataset.available === 'true'){
      tr[i].classList.add('available');
    } 
    
    if (status.dataset.available === 'false') {
      tr[i].classList.add('unavailable');
    }

    if (!status.dataset.available) {
      tr[i].setAttribute('hidden', '');
    }

    let gender = tr[i].cells[2];
    if(gender.innerHTML === 'm'){
      tr[i].classList.add('male')
    } else{
      tr[i].classList.add('female')
    }

    let age = tr[i].cells[1];
      if (+(age.innerHTML) < 18) {
        tr[i].style.textDecoration = "line-through";
        }
  
  }

}

