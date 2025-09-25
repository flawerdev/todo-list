const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

// LOCAL STORAGE

function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadTasks() {
    const data = localStorage.getItem("tasks");
    if (data) {
        listContainer.innerHTML = data;

        listContainer.querySelectorAll("li").forEach(li => {
            const checkbox = li.querySelector("input");
            const editBtn = li.querySelector(".edit-btn");
            const taskSpan = li.querySelector("span");
            const deleteBtn = li.querySelector(".delete-btn");

            checkbox.addEventListener("click", function (){
                li.classList.toggle("completed", checkbox.checked);
                updateCounters();
                saveTasks();
            });

            editBtn.addEventListener("click", function () {
                const update = prompt("Edit task: ", taskSpan.textContent);
                if (update !== null) {
                    taskSpan.textContent = update;
                    li.classList.remove("completed");
                    checkbox.checked = false;
                    updateCounters();
                    saveTasks();
                }
            });

            deleteBtn.addEventListener("click", function () {
                if (confirm("Are you sure you want to delete this task?")) {
                    li.remove();
                    updateCounters();
                    saveTasks();
                }
            });

            
        })
    }
}


function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please add a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span class="task-text">${task}</span>
        </label>
        <span class="delete-btn">🗑 Delete</span>
        <span class="edit-btn">🖊 Edit</span>

        `;

    listContainer.appendChild(li);
    inputBox.value="";

    // Event listeners 
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector(".task-text");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function (){
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
        saveTasks();
    });

    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task: ", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
            saveTasks();
        }
    });

    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
            saveTasks();
        }
    });

    updateCounters();
    saveTasks();
}

inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();        
    }
});

window.addEventListener("load", loadTasks);