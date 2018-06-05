class Todo {
  constructor() {
    // Fields
    titleField = document.querySelector('.sidebar__title');
    this.dateField = document.querySelector('.sidebar__date');
    this.descField = document.querySelector('.sidebar__desc');
    // Buttons
    this.addBtn = document.querySelector('.sidebar__save');
    this.newBtn = document.querySelector('.main__btn-new');
    this.delBtn = document.querySelector('.sidebar__del');
    let tabs;
    // Body
    this.body = document.querySelector('.main__body');
    this.tabsList = document.querySelector('.main__tabs');
  }

  saveNote() {
    let arr = JSON.parse(localStorage.getItem('notes')) || [];
    this.newNote = {
      id: Math.random(),
      title: this.titleField.value,
      date: this.dateField.value,
      desc: this.descField.value
    };
    arr.push(this.newNote);
    localStorage.clear();
    localStorage.setItem('notes', JSON.stringify(arr));
    storage = JSON.parse(localStorage.getItem('notes'));
    this.createTabs()
  }

  createTabs() {
    const stor = JSON.parse(localStorage.getItem('notes')) || [];
    tabsList.innerHTML = '';
    stor.forEach((note, index) => {
      tabsList.innerHTML += `<button 
                                    class="main__button ${storage.length - 1 === index ? 'main__button--active' : ''}" 
                                    id=${note.id}
                                    onclick="showNote(event.target)"
                                    >№${index + 1} 
                                    </button>`;
    });
    tabs = document.querySelector('.main__tab');

    const active = document.querySelector('.main__button--active');
    active.click()
  }

}

const todo = new Todo();

todo.








// Storage
let storage = JSON.parse(localStorage.getItem('notes')) || [];

function showCurrentNote(note) {
  const body = document.querySelector('.main__body');
  body.innerHTML = `
            <h3>${note.title} <span>${note.date}</span></h3>
            <p>${note.desc}</p>
        `
}

function showNote(el) {
  const id = el.getAttribute('id');
  storage.forEach((note) => {
    if (note.id === Number(id)) {
      showCurrentNote(note);
      console.log(note);
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {

  // Fields
  const titleField = document.querySelector('.sidebar__title');
  const dateField = document.querySelector('.sidebar__date');
  const descField = document.querySelector('.sidebar__desc');
  // Buttons
  const addBtn = document.querySelector('.sidebar__save');
  const newBtn = document.querySelector('.main__btn-new');
  const delBtn = document.querySelector('.sidebar__del');
  let tabs;
  // Body
  const body = document.querySelector('.main__body');
  const tabsList = document.querySelector('.main__tabs');

  let newNote = {
    id: Math.random(),
    title: titleField.value,
    date: dateField.value,
    desc: descField.value
  };


  function init() {
    if (storage.length > 0) {
      createTabs()
    } else {
      body.innerHTML = '<h3 style="text-align: center">Нет сохраненных заметок. Создайте новую!</h3>'
    }
  }

  function saveNote() {
    let arr = JSON.parse(localStorage.getItem('notes')) || [];
    newNote = {
      id: Math.random(),
      title: titleField.value,
      date: dateField.value,
      desc: descField.value
    };
    arr.push(newNote);
    localStorage.clear();
    localStorage.setItem('notes', JSON.stringify(arr));
    storage = JSON.parse(localStorage.getItem('notes'));
    createTabs()
  }

  function createTabs() {
    const stor = JSON.parse(localStorage.getItem('notes')) || [];
    tabsList.innerHTML = '';
    stor.forEach((note, index) => {
      tabsList.innerHTML += `<button 
                                    class="main__button ${storage.length - 1 === index ? 'main__button--active' : ''}" 
                                    id=${note.id}
                                    onclick="showNote(event.target)"
                                    >№${index + 1} 
                                    </button>`;
    });
    tabs = document.querySelector('.main__tab');

    const active = document.querySelector('.main__button--active');
    active.click()
  }


  init();

  addBtn.addEventListener('click', () => {
    saveNote()
  });


});