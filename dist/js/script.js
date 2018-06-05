'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function () {
    function Todo() {
        _classCallCheck(this, Todo);

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
        this.options.saveBtn.addEventListener('click', this.saveNewNote.bind(this));
        this.options.delBtn.addEventListener('click', this.deleteNote.bind(this));

        this.initTabs();
    }

    _createClass(Todo, [{
        key: 'getNotes',
        value: function getNotes() {
            // Storage
            return JSON.parse(localStorage.getItem('notes')) || [];
        }
    }, {
        key: 'initTabs',
        value: function initTabs() {
            var _this = this;

            var notes = this.getNotes();
            this.options.tabsList.innerHTML = '';
            notes.forEach(function (note, index) {
                _this.options.tabsList.innerHTML += '<button \n                                    class="main__button ' + (notes.length - 1 === index ? 'main__button--active' : '') + '" \n                                    id=' + note.id + '\n                                    >\u2116' + (index + 1) + ' \n                                    </button>';
            });
            var active = document.querySelector('.main__button--active');
            if (active) {
                active.click();
                var id = active.getAttribute('id');
                this.showCurrentNoteInfo(id);
            } else {
                this.createNewNote();
            }
        }
    }, {
        key: 'createNewNote',
        value: function createNewNote() {
            var active = document.querySelector('.main__button--active');
            if (active) {
                active.classList.remove('main__button--active');
            }
            this.options.titleField.value = '';
            this.options.dateField.value = '';
            this.options.descField.value = '';
            this.options.body.innerHTML = '';
            this.options.tabsList.innerHTML += '<button class="main__button main__button--active">New note</button>';
        }
    }, {
        key: 'saveNewNote',
        value: function saveNewNote() {
            var arr = this.getNotes();
            var newNote = {
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
    }, {
        key: 'deleteNote',
        value: function deleteNote() {
            var activeBtn = document.querySelector('.main__button--active');
            var noteId = activeBtn.getAttribute('id');
            var arr = this.getNotes();
            var result = arr.filter(function (item) {
                return item.id !== Number(noteId);
            });
            localStorage.clear();
            localStorage.setItem('notes', JSON.stringify(result));
            this.initTabs();
        }
    }, {
        key: 'showCurrentNoteInfo',
        value: function showCurrentNoteInfo(id) {
            var storage = this.getNotes();
            var currentNote = storage.find(function (item) {
                return item.id === Number(id);
            });
            this.options.body.innerHTML = '\n            <h3>' + currentNote.title + ' <span>' + currentNote.date + '</span></h3>\n            <p>' + currentNote.desc + '</p>\n        ';
        }
    }, {
        key: 'clickToTab',
        value: function clickToTab(event) {
            if (event.target.classList.contains('main__button')) {
                var id = event.target.getAttribute('id');
                var active = document.querySelector('.main__button--active');
                active.classList.remove('main__button--active');
                event.target.classList.add('main__button--active');
                this.showCurrentNoteInfo(id);
            }
        }
    }]);

    return Todo;
}();

document.addEventListener('DOMContentLoaded', function () {
    new Todo();
});

// // Storage
// let storage = JSON.parse(localStorage.getItem('notes')) || [];
//
// function showCurrentNote(note) {
//     const body = document.querySelector('.main__body');
//     body.innerHTML = `
//             <h3>${note.title} <span>${note.date}</span></h3>
//             <p>${note.desc}</p>
//         `
// }
//
// function showNote(el) {
//     const id = el.getAttribute('id');
//     storage.forEach((note) => {
//         if (note.id === Number(id)) {
//             showCurrentNote(note);
//             console.log(note);
//         }
//     })
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//
//     // Fields
//     const titleField = document.querySelector('.sidebar__title');
//     const dateField = document.querySelector('.sidebar__date');
//     const descField = document.querySelector('.sidebar__desc');
//     // Buttons
//     const addBtn = document.querySelector('.sidebar__save');
//     const newBtn = document.querySelector('.main__btn-new');
//     const delBtn = document.querySelector('.sidebar__del');
//     let tabs;
//     // Body
//     const body = document.querySelector('.main__body');
//     const tabsList = document.querySelector('.main__tabs');
//
//     let newNote = {
//         id: Math.random(),
//         title: titleField.value,
//         date: dateField.value,
//         desc: descField.value
//     };
//
//
//     function init() {
//         if (storage.length > 0) {
//             createTabs()
//         } else {
//             body.innerHTML = '<h3 style="text-align: center">Нет сохраненных заметок. Создайте новую!</h3>'
//         }
//     }
//
//     function saveNote() {
//         let arr = JSON.parse(localStorage.getItem('notes')) || [];
//         newNote = {
//             id: Math.random(),
//             title: titleField.value,
//             date: dateField.value,
//             desc: descField.value
//         };
//         arr.push(newNote);
//         localStorage.clear();
//         localStorage.setItem('notes', JSON.stringify(arr));
//         storage = JSON.parse(localStorage.getItem('notes'));
//         createTabs()
//     }
//
//     function createTabs() {
//         const stor = JSON.parse(localStorage.getItem('notes')) || [];
//         tabsList.innerHTML = '';
//         stor.forEach((note, index) => {
//             tabsList.innerHTML += `<button
//                                     class="main__button ${storage.length - 1 === index ? 'main__button--active' : ''}"
//                                     id=${note.id}
//                                     onclick="showNote(event.target)"
//                                     >№${index + 1}
//                                     </button>`;
//         });
//         tabs = document.querySelector('.main__tab');
//
//         const active = document.querySelector('.main__button--active');
//         active.click()
//     }
//
//
//     init();
//
//     addBtn.addEventListener('click', () => {
//         saveNote()
//     });
//
//
// });
//# sourceMappingURL=script.js.map
