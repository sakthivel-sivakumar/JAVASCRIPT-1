const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Filter buttons
const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");

// Counters
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// search
const searchInput = document.getElementById("searchInput");

// Data
const tasks = [];
let nextId = 1;
let currentFilter = "all";


// ==============================
// ADD TASK
// ==============================

addTaskBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    const newTask = {
        id: nextId++,
        name: task,
        completed: false
    };

    tasks.push(newTask);

    renderTasks();

    taskInput.value = "";
});

// search 

searchInput.addEventListener("input", function () {

    renderTasks();

});

function renderTasks() {

    let filteredTasks = tasks;


    if (currentFilter === "pending") {

        filteredTasks = filteredTasks.filter(function (task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        filteredTasks = filteredTasks.filter(function (task) {
            return task.completed;
        });

    }


   
// FILTER BY SEARCH
  

    const searchText = searchInput.value.toLowerCase().trim();

    if (searchText !== "") {

        filteredTasks = filteredTasks.filter(function (task) {

            return task.name
                .toLowerCase()
                .includes(searchText);

        });

    }


    // =========================
    // CREATE HTML
    // =========================

    const taskHTML = filteredTasks.map( task => {

        return `
            <div class="task ${task.completed ? "completed" : ""}">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="task-name">
                    ${task.name}
                </span>

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

    });

    taskList.innerHTML = taskHTML.join("");


    // Update counts
    fetchCounts(tasks);

    // Update active filter
    updateActiveFilter();
}

// ==============================
// FETCH COUNTS
// ==============================

function fetchCounts(tasks) {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pending = tasks.filter(function (task) {
        return !task.completed;
    }).length;


    // Update summary
    totalCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;


    // Update filter buttons
    allBtn.textContent = `All (${total})`;
    pendingBtn.textContent = `Pending (${pending})`;
    completedBtn.textContent = `Completed (${completed})`;
}


// ==============================
// TOGGLE TASK
// ==============================

function toggleTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });

    task.completed = !task.completed;

    renderTasks();
}


// ==============================
// DELETE TASK
// ==============================

function deleteTask(id) {

    const updatedTasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    tasks.length = 0;

    tasks.push(...updatedTasks);

    renderTasks();
}


// ==============================
// EDIT TASK
// ==============================

function editTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });

    const newName = prompt(
        "Enter new task name:",
        task.name
    );

    if (newName === null) {
        return;
    }

    if (newName.trim() === "") {
        alert("Task name cannot be empty");
        return;
    }

    task.name = newName.trim();

    renderTasks();
}


// ==============================
// FILTER BUTTONS
// ==============================

allBtn.addEventListener("click", function () {

    currentFilter = "all";

    renderTasks();
});


pendingBtn.addEventListener("click", function () {

    currentFilter = "pending";

    renderTasks();
});


completedBtn.addEventListener("click", function () {

    currentFilter = "completed";

    renderTasks();
});


// ==============================
// ACTIVE FILTER
// ==============================

function updateActiveFilter() {

    allBtn.classList.remove("active");
    pendingBtn.classList.remove("active");
    completedBtn.classList.remove("active");


    if (currentFilter === "all") {
        allBtn.classList.add("active");
    }

    if (currentFilter === "pending") {
        pendingBtn.classList.add("active");
    }

    if (currentFilter === "completed") {
        completedBtn.classList.add("active");
    }
}

