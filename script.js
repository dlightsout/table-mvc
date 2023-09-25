//Model
/* 
Model:
This will handle the data and logic related to storing and retrieving the data from local storage.
It will also provide methods for adding, deleting, and sorting the data.

View:
This will display the table to the user, including the delete buttons and input fields.
It will have methods to render the table, listen for user input, and trigger appropriate controller actions.

Controller:
It will mediate between the Model and View.
It will handle user interactions and update the Model and View accordingly.
*/
console.log('this is document',document)

class TableModel {
  constructor() {
      this.data = JSON.parse(localStorage.getItem('tableData')) || [];
  }

  addRow(row) {
      this.data.push(row);
      this._updateLocalStorage();
  }

  deleteRow(id) {
      this.data = this.data.filter(row => row.id !== id);
      this._updateLocalStorage();
  }

  getRows() {
      return this.data;
  }

  sortData(key) {
      this.data.sort((a, b) => {
          if (a[key] > b[key]) return 1;
          if (a[key] < b[key]) return -1;
          return 0;
      });
      this._updateLocalStorage();
  }

  _updateLocalStorage() {
      localStorage.setItem('tableData', JSON.stringify(this.data));
  }
}

// VIEW 

class TableView {
  constructor(controller) {
      this.table = document.querySelector('#dataTable');
      this.controller = controller;
      this.initAddRow();
      this.render();
  }

  setController(controller) {
        this.controller = controller;
        controller.setView(this);
    }

  render() {
      this.table.innerHTML = '';
      const rows = this.controller.getRows();
      console.log(rows)
      rows.forEach(row => {
            console.log(row)
          const tr = document.createElement('tr');
          Object.keys(row).forEach(key => {
              const td = document.createElement('td');
              console.log(row[key])
              td.innerText = row[key];
              td.addEventListener('click', ( ) => this.controller.sortData(key));
              tr.appendChild(td);
          });
          const deleteBtn = document.createElement('button');
          deleteBtn.innerText = 'Delete';
          deleteBtn.addEventListener('click', () => {
              this.controller.deleteRow(row.id);
              this.render();
          });
          tr.appendChild(deleteBtn);
          this.table.appendChild(tr);
      });
  }

  
  initAddRow() {
      const addRowForm = document.querySelector('#AddRowForm');
      console.log(addRowForm)
      addRowForm.addEventListener('submit', (event) => {
        console.log('i am in the initAddRow ')
          event.preventDefault();
          const id = Date.now();
          const firstName = addRowForm.first_name.value;
          const lastName = addRowForm.last_name.value;
          const age = addRowForm.age.value;
          const height = addRowForm.height.value;
          console.log(id,firstName,lastName,age, height)
          this.controller.addRow({ id, firstName, lastName, age, height });
          this.render();
          addRowForm.reset();
      });
  }
}


// CONTROLLER 

class TableController {
  constructor(model) {
      this.model = model;
  }

  setView(view) {
    this.view = view;
    }

  addRow(row) {
      this.model.addRow(row);
  }

  deleteRow(id) {
      this.model.deleteRow(id);
  }

  getRows() {
      return this.model.getRows();
  }

  sortData(key) {
      this.model.sortData(key);
      this.view.render();
  }
}

// const model = new TableModel();
// const controller = new TableController(model, new TableView(controller));

document.addEventListener("DOMContentLoaded", function() {
  const model = new TableModel();
  const controller = new TableController(model);
  const view = new TableView(controller);
  controller.setView(view);
});







