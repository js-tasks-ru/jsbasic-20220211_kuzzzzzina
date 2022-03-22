/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows;
  #elem;

  constructor(rows) {
      this.#rows = rows;
      this.#elem = document.createElement("table");
      this.makeTable();
  }
  get elem() {
      return this.#elem;
  }
  makeTable() {
      let elementTable = `      
      <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
      </thead>
      <tbody>` + this.#rows.map(item => `
      <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</button></td>
      </tr>              
              `).join('') + `</tbody>`;

      this.#elem.innerHTML = elementTable;
      
      let buttons = this.#elem.querySelectorAll("button");
      for (let btn of buttons){
          btn.addEventListener("click", this);
      }
  }
   handleEvent(event) {
      let row = event.target.parentElement.parentElement; 
      this.#rows.splice(row.rowIndex - 1, 1); 
      row.remove();
      
  }


}
