import Task from './Task.mjs';

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('addTaskForm');
    const taskList = document.getElementById('taskList');

    loadTasks(JSON.parse(localStorage.getItem("data")));

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskNameInput = document.getElementById('taskName');
        const taskName = taskNameInput.value.trim();

        if (taskName !== '') {
            addTaskToList(taskName);
            taskNameInput.value = '';
        }
    });

    function loadTasks(data) {
        if (data !== null) {
            for(let key in data){
                if (data[key] != null) {
                     renderTaskOnList(data[key]);
                }
            };
        }
    }

    function getId() {
        let id = Number(localStorage.getItem("id"));
        localStorage.setItem("id", id + 1);
        return id;
    }

    function renderTaskOnList(task) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="editable" contentEditable="false">${task.name}</span>
            <span class="identifier" contentEditable="false">${task.id}</span>
            <div class='buttons'>
                <button class='listEditRow'>Edit</button>
                <button class='listdeleteRow'>Delete</button>
            </div>
        `;

        // Append to list
        taskList.appendChild(listItem);
    }

    function addTaskToList(taskName) {
        let tmp = new Task(getId(), taskName);
        if (localStorage.getItem("data") === null) {
            let data = {};
           data[tmp.id]=tmp;
           localStorage.setItem("data", JSON.stringify(data));
        } else {
            let data = JSON.parse(localStorage.getItem("data"));
            data[tmp.id]=tmp;
            localStorage.setItem("data", JSON.stringify(data));
            
        }

        renderTaskOnList(tmp);
    }

    // Event delegation for the entire task list
    taskList.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('listEditRow')) {
            handleEditButtonClick(target);
        } else if (target.classList.contains('listdeleteRow')) {
            handleDeleteButtonClick(target);
        }
    });

    function handleEditButtonClick(button) {
        const listItem = button.closest('li');
        const editable = listItem.querySelector('.editable');

        // Toggle contentEditable
        editable.contentEditable = !(editable.contentEditable === 'true');

        // Toggle border style to visually indicate editing
        editable.style.border = (editable.contentEditable === 'true') ? '1px solid #007BFF' : 'none';

        // Update button text
        button.textContent = editable.contentEditable === 'true' ? 'Save' : 'Edit';

        console.log("changed alert :" + editable.textContent);
        const identifier = listItem.querySelector('.identifier').textContent;
        let data = JSON.parse(localStorage.getItem("data"));
        let temp=data[identifier];
        temp.name=editable.textContent;
        data[identifier]=temp;
        localStorage.setItem("data", JSON.stringify(data));
        
    }

    function handleDeleteButtonClick(button) {
        const listItem = button.closest('li');
        const taskName = listItem.querySelector('.editable').textContent;
        const identifier = listItem.querySelector('.identifier').textContent;
        alert('Deleting task: ' + taskName);
        let data = JSON.parse(localStorage.getItem("data"));
        delete data[identifier];
        localStorage.setItem("data", JSON.stringify(data));
        listItem.remove();
    }
});
