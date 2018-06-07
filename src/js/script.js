class Todo {

    constructor() {
        this.options = {
            // Fields
            titleField: document.querySelector('.sidebar__title'),
            dateField: document.querySelector('.sidebar__date'),
            descField: document.querySelector('.sidebar__desc'),
            // Buttons
            saveBtn: document.querySelector('.sidebar__save'),
            delBtn: document.querySelector('.sidebar__del'),
            newNoteBtn: document.querySelector('.main__btn-new'),
            // Body
            body: document.querySelector('.main__body'),
            tabsList: document.querySelector('.main__tabs')
        };
        this.options.tabsList.addEventListener('click', this.clickToTab.bind(this));
        this.options.newNoteBtn.addEventListener('click', this.createNewNote.bind(this));
        this.options.saveBtn.addEventListener('click', this.saveNote.bind(this));
        this.options.delBtn.addEventListener('click', this.deleteNote.bind(this));

        this.initTabs();
    }

    getNotes() {
        // Storage
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    initTabs() {
        const notes = this.getNotes();
        this.options.tabsList.innerHTML = '';
        notes.forEach((note, index) => {
            this.options.tabsList.innerHTML += `<button 
                                    class="main__button ${notes.length - 1 === index ? 'main__button--active' : ''}" 
                                    id=${note.id}
                                    >№${index + 1} 
                                    </button>`;
        });
        const active = document.querySelector('.main__button--active');
        if (active) {
            active.click();
            const id = active.getAttribute('id');
            this.showCurrentNoteInfo(id);
        } else {
            this.createNewNote();
        }
    }

    createNewNote() {
        let active = document.querySelector('.main__button--active');
        if (active) {
            if (!active.getAttribute('id')) {
                // Если уже идет процесс создания заметки
                return false
            }
            active.classList.remove('main__button--active');
        }
        this.options.titleField.value = '';
        this.options.dateField.value = new Date(Date.now()).toLocaleString('ru-RU');
        this.options.descField.value = '';
        this.options.body.innerHTML = '';
        this.options.tabsList.innerHTML += `<button class="main__button main__button--active">New note</button>`;
    }

    saveNote() {
        const active = document.querySelector('.main__button--active');
        const id = active.getAttribute('id');
        let arr = this.getNotes();
        let isValid = this.validation();
        if (!isValid) {
            return false;
        }
        if (id) {
            let newNote = {
                id: Number(id),
                title: this.options.titleField.value,
                date: this.options.dateField.value,
                desc: this.options.descField.value
            };
            const currentNote = arr.find( note => note.id === Number(id));
            const index = arr.indexOf(currentNote);
            arr[index] = newNote;
            localStorage.clear();
            localStorage.setItem('notes', JSON.stringify(arr));
            this.options.body.innerHTML = `
                <h3>${newNote.title} <span>${newNote.date}</span></h3>
                <p>${newNote.desc}</p>
            `;
        } else {
            let newNote = {
                id: Math.random(),
                title: this.options.titleField.value,
                date: this.options.dateField.value,
                desc: this.options.descField.value
            };
            arr.push(newNote);
            localStorage.clear();
            localStorage.setItem('notes', JSON.stringify(arr));
            this.initTabs();
        }
    }

    deleteNote() {
        let del = confirm('Вы действительно хотите удалить заметку?');
        if (!del) {
            return;
        }
        const activeBtn = document.querySelector('.main__button--active');
        const noteId = activeBtn.getAttribute('id');
        let arr = this.getNotes();
        const result = arr.filter( item => item.id !== Number(noteId) );
        localStorage.clear();
        localStorage.setItem('notes', JSON.stringify(result));
        this.initTabs();
    }

    showCurrentNoteInfo(id) {
        const storage = this.getNotes();
        const currentNote = storage.find( item => item.id === Number(id) );
        this.options.body.innerHTML = `
            <h3>${currentNote.title} <span>${currentNote.date}</span></h3>
            <p>${currentNote.desc}</p>
        `;
        this.options.titleField.value = currentNote.title;
        this.options.dateField.value = currentNote.date;
        this.options.descField.value = currentNote.desc;
    }

    clickToTab(event) {
        const buttons = document.querySelectorAll('.main__button');
        if (event.target.classList.contains('main__button')) {
            const id = event.target.getAttribute('id');
            const active = document.querySelector('.main__button--active');
            if (active.getAttribute('id')) {
                active.classList.remove('main__button--active');
                event.target.classList.add('main__button--active');
                this.showCurrentNoteInfo(id);
            } else {
                // Если это создание новой заметки
                if (buttons.length > 1) {
                    // Если заметок больше чем одна
                    active.remove();
                    event.target.classList.add('main__button--active');
                    this.showCurrentNoteInfo(id);
                }
            }
        }
    }

    validation() {
        if (this.options.titleField.value.trim() === '' || this.options.descField.value.trim() === '') {
            alert('Все поля должны быть заполнены!');
            return;
        }
        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Todo();
});
