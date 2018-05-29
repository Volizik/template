document.addEventListener('DOMContentLoaded', () => {

    // Fields
    const titleField = document.querySelector('.sidebar__title');
    const dateField = document.querySelector('.sidebar__date');
    const descField = document.querySelector('.sidebar__desc');
    // Buttons
    const addBtn = document.querySelector('.sidebar__save');
    const newBtn = document.querySelector('.main__btn-new');
    const delBtn = document.querySelector('.sidebar__del');
    // Body
    const body = document.querySelector('.main__body');
    const tabsList = document.querySelector('.main__tabs');
    let tabs = null;
    // Storage
    let storage = JSON.parse(localStorage.getItem('notes')) || [];
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
        storage = JSON.parse(localStorage.getItem('notes'))
    }

    function createTabs() {
        storage.forEach((note, index) => {
            tabsList.innerHTML += `<button 
                                    class="main__button ${storage.length - 1 === index ? 'main__button--active' : ''}" 
                                    id=${note.id}>№${index + 1}
                                    </button>`;
        });
        tabs = document.querySelectorAll('.main__button');
    }

    function showNote(el) {
        const id = el.getAttribute('id');
        storage.forEach((note, index) => {
            if (note.id === id) {
                console.log(note)
            }
        })
    }

    init();

    addBtn.addEventListener('click', () => {
        saveNote()
    });

    newBtn.addEventListener('click', () => {

    });

    tabs.addEventListener('click', function (event) {
        showNote(event.target)
    })
});