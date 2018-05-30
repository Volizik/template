'use strict';

// Storage
var storage = JSON.parse(localStorage.getItem('notes')) || [];

function showCurrentNote(note) {
    var body = document.querySelector('.main__body');
    body.innerHTML = '\n            <h3>' + note.title + ' <span>' + note.date + '</span></h3>\n            <p>' + note.desc + '</p>\n        ';
}
function showNote(el) {
    var id = el.getAttribute('id');
    storage.forEach(function (note) {
        if (note.id === Number(id)) {
            showCurrentNote(note);
            console.log(note);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // Fields
    var titleField = document.querySelector('.sidebar__title');
    var dateField = document.querySelector('.sidebar__date');
    var descField = document.querySelector('.sidebar__desc');
    // Buttons
    var addBtn = document.querySelector('.sidebar__save');
    var newBtn = document.querySelector('.main__btn-new');
    var delBtn = document.querySelector('.sidebar__del');
    var tabs = void 0;
    // Body
    var body = document.querySelector('.main__body');
    var tabsList = document.querySelector('.main__tabs');

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
        createTabs();
    }

    function createTabs() {
        var stor = JSON.parse(localStorage.getItem('notes')) || [];
        tabsList.innerHTML = '';
        stor.forEach(function (note, index) {
            tabsList.innerHTML += '<button \n                                    class="main__button ' + (storage.length - 1 === index ? 'main__button--active' : '') + '" \n                                    id=' + note.id + '\n                                    onclick="showNote(event.target)"\n                                    >\u2116' + (index + 1) + ' \n                                    </button>';
        });
        tabs = document.querySelector('.main__tab');

        var active = document.querySelector('.main__button--active');
        active.click();
    }

    init();

    addBtn.addEventListener('click', function () {
        saveNote();
    });
});
//# sourceMappingURL=script.js.map
