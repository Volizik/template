'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // Fields
    var titleField = document.querySelector('.sidebar__title');
    var dateField = document.querySelector('.sidebar__date');
    var descField = document.querySelector('.sidebar__desc');
    // Buttons
    var addBtn = document.querySelector('.sidebar__save');
    var newBtn = document.querySelector('.main__btn-new');
    var delBtn = document.querySelector('.sidebar__del');
    // Body
    var body = document.querySelector('.main__body');
    var tabsList = document.querySelector('.main__tabs');
    var tabs = null;
    // Storage
    var storage = JSON.parse(localStorage.getItem('notes')) || [];
    var newNote = {
        id: Math.random(),
        title: titleField.value,
        date: dateField.value,
        desc: descField.value
    };

    function init() {
        if (storage.length > 0) {
            createTabs();
        } else {
            body.innerHTML = '<h3 style="text-align: center">Нет сохраненных заметок. Создайте новую!</h3>';
        }
    }

    function saveNote() {
        var arr = JSON.parse(localStorage.getItem('notes')) || [];
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
    }

    function createTabs() {
        storage.forEach(function (note, index) {
            tabsList.innerHTML += '<button \n                                    class="main__button ' + (storage.length - 1 === index ? 'main__button--active' : '') + '" \n                                    id=' + note.id + '>\u2116' + (index + 1) + '\n                                    </button>';
        });
        tabs = document.querySelectorAll('.main__button');
    }

    function showNote(el) {
        var id = el.getAttribute('id');
        storage.forEach(function (note, index) {
            if (note.id === id) {
                console.log(note);
            }
        });
    }

    init();

    addBtn.addEventListener('click', function () {
        saveNote();
    });

    newBtn.addEventListener('click', function () {});

    tabs.addEventListener('click', function (event) {
        showNote(event.target);
    });
});
//# sourceMappingURL=script.js.map
