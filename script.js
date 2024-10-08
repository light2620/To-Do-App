let taskData = [];

const addBtn = document.getElementById("add-btn");
const deleteAllBtn = document.getElementById("delete-all");
const overlay = document.querySelector(".overlay");
const taskFormCont = document.getElementById("task-form-cont");
const cancelTask = document.getElementById("cancel-task");
const taskForm = document.getElementById("task-form"); // The form element
const taskHeading = document.getElementById("task-head");
const taskDate = document.getElementById("task-date");
const taskDescription = document.getElementById("task-description");
const taskCont = document.getElementById("task-cont");
const prioritySelection = document.getElementById("priority-select"); 
const filter = document.getElementById("filter");
const resetFilter = document.getElementById("reset-filter");

let editingIndex = null; // To keep track of the task being edited
filterByPriority();
// Show the task form overlay
addBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    taskFormCont.style.display = "flex";
    taskForm.querySelector("button[type='submit']").innerText = "Add Task"; // Reset button text
});

// Hide the task form overlay
cancelTask.addEventListener("click", () => {
    overlay.style.display = "none";
    taskFormCont.style.display = "none";
    prioritySelection.selectedIndex = 0;
});

// Add or update task when the form is submitted
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    addTasks(editingIndex); // Pass the index if editing
    
});

// Function to add or update tasks
function addTasks(index) {
    if (index !== null) { // If editing
        taskData[index].heading = taskHeading.value;
        taskData[index].date = taskDate.value;
        taskData[index].description = taskDescription.value;
        taskData[index].priority = prioritySelection.value;
        editingIndex = null; // Reset the editing index after updating
    } else { // If adding
        // Add task to taskData array
        const taskObject = {
            heading: taskHeading.value,
            date: taskDate.value,
            description: taskDescription.value,
            priority : prioritySelection.value
        };
        taskData.push(taskObject);
    }

    // Clear input fields
    taskHeading.value = '';
    taskDate.value = '';
    taskDescription.value = '';
    prioritySelection.selectedIndex = 0;

    // Hide the overlay
    overlay.style.display = "none";
    taskFormCont.style.display = "none";
    render(); // Call render to update the UI
}

// Function to render tasks
function render() {
    taskCont.innerHTML = ""; // Clear the current task container
    if (taskData.length === 0) {
        taskCont.innerHTML = `<h1>Add your task here</h1>`;
        return; // Exit early if there are no tasks
    }

    taskData.forEach((item, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "tasks");
        taskDiv.setAttribute("data-priority", item.priority);
        taskDiv.innerHTML = `
             <div class="task-info" id="task-info">
        <div class="heading"><strong>Heading: </strong>${item.heading}</div>
        <div class="date"><strong>Date: </strong>${item.date}</div>
        ${item.description ? `<div class="description"><strong>Description: </strong>${item.description}</div>` : ''}
        ${item.priority ? `<div class="task-priority"><strong>Priority: </strong>${item.priority}</div>` : ''}
    </div>
    <div class="edit-delete-btn" id="edit-delete-bt">
        <button class="edit-btn task-btn btn" id="${index}">Edit</button>
        <button class="delete-btn task-btn btn" id="${index}">Delete</button>
    </div>`;
        taskCont.appendChild(taskDiv);
    });
    attachDeleteListeners(); // Attach delete listeners to new buttons
    editTasks(); // Attach edit listeners to new buttons
    applyFilter()
}

// Function to attach delete listeners
function attachDeleteListeners() {
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((item) => {
        item.addEventListener("click", (ev) => {
            const currentElementId = parseInt(ev.target.id, 10);
            taskData.splice(currentElementId, 1); // Remove the task at that ID
            render(); // Re-render the UI
      
        });
    });
}

// Function to handle editing tasks
function editTasks() {
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((item) => {
        item.addEventListener("click", (ev) => {
            const index = parseInt(ev.target.id, 10);
            overlay.style.display = "flex";
            taskFormCont.style.display = "flex";

            // Populate the form with the current task's details
            taskHeading.value = taskData[index].heading;
            taskDate.value = taskData[index].date;
            taskDescription.value = taskData[index].description;
            prioritySelection.value = taskData[index].priority;

            // Set the index for updating
            editingIndex = index; // Set editing index
            document.getElementById("add-task").innerText = "Update Text";
        });
    });
taskHeading.value = "";
            taskDate.value = "";
            taskDescription.value = "";
            prioritySelection.value = prioritySelection.selectedIndex = 0;
    document.getElementById("add-task").innerText = "Add Task";
    
}



deleteAllBtn.addEventListener("click",() => {
    taskData = [];
    render();
});


function filterByPriority() {
    filter.addEventListener("change", () => {
        resetFilter.style.display = "block";
        applyFilter(); // Apply the filter when the selection changes
    });
}

// Apply filter based on current filter value
function applyFilter() {
    const taskInfo = document.querySelectorAll(".tasks");
    const filterValue = filter.value;
    
    taskInfo.forEach((task) => {
        task.style.display = "flex"; // Show all tasks initially

        // Apply filters based on the selected filter value
        if (filterValue === "Top Priority" && task.getAttribute("data-priority") !== "Top Priority") {
            task.style.display = "none";
        } else if (filterValue === "Low Priority" && task.getAttribute("data-priority") !== "Low Priority") {
            task.style.display = "none";
        }
    });
}

// Show all tasks and reset the filter
resetFilter.addEventListener("click", () => {
    filter.selectedIndex = 0;
    resetFilter.style.display = "none";
    applyFilter(); // Re-apply to show all tasks
});

