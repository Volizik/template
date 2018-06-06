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
        this.options.saveBtn.addEventListener('click', this.saveNote.bind(this));
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
                if (!active.getAttribute('id')) {
                    // Если уже идет процесс создания заметки
                    return false;
                }
                active.classList.remove('main__button--active');
            }
            this.options.titleField.value = '';
            this.options.dateField.value = new Date(Date.now()).toLocaleString('ru-RU');
            this.options.descField.value = '';
            this.options.body.innerHTML = '';
            this.options.tabsList.innerHTML += '<button class="main__button main__button--active">New note</button>';
        }
    }, {
        key: 'saveNote',
        value: function saveNote() {
            var active = document.querySelector('.main__button--active');
            var id = active.getAttribute('id');
            var arr = this.getNotes();
            if (id) {
                var newNote = {
                    id: Number(id),
                    title: this.options.titleField.value,
                    date: this.options.dateField.value,
                    desc: this.options.descField.value
                };
                var currentNote = arr.find(function (note) {
                    return note.id === Number(id);
                });
                var index = arr.indexOf(currentNote);
                arr[index] = newNote;
                localStorage.clear();
                localStorage.setItem('notes', JSON.stringify(arr));
            } else {
                var _newNote = {
                    id: Math.random(),
                    title: this.options.titleField.value,
                    date: this.options.dateField.value,
                    desc: this.options.descField.value
                };
                arr.push(_newNote);
                localStorage.clear();
                localStorage.setItem('notes', JSON.stringify(arr));
            }
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
            this.options.titleField.value = currentNote.title;
            this.options.dateField.value = currentNote.date;
            this.options.descField.value = currentNote.desc;
        }
    }, {
        key: 'clickToTab',
        value: function clickToTab(event) {
            var buttons = document.querySelectorAll('.main__button');
            if (event.target.classList.contains('main__button')) {
                var id = event.target.getAttribute('id');
                var active = document.querySelector('.main__button--active');
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
    }]);

    return Todo;
}();

document.addEventListener('DOMContentLoaded', function () {
    new Todo();
});
//# sourceMappingURL=script.js.map
