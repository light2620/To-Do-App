let taskData = [
];
const addBtn = document.getElementById("add-btn");
const deleteAllBtn = document.getElementById("delete-all");
const overlay = document.querySelector(".overlay");
const taskFormCont = document.getElementById("task-form-cont");
const cancelTask = document.getElementById("cancel-task");
const addTask = document.getElementById("add-task");
const taskHeading = document.getElementById("task-head");
const taskDate = document.getElementById("task-date");
const taskDescription = document.getElementById("task-description");
const taskCont = document.getElementById("task-cont");


// this will open the pop-window
addBtn.addEventListener("click",() => {
    overlay.style.display = "flex";
    taskFormCont.style.display = "flex";

});


// this will close the pop-window
cancelTask.addEventListener("click",() => {
    overlay.style.display = "none";
    taskFormCont.style.display = "none";
});

//adding task to taskData array 
addTask.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const taskObject = {
        heading: taskHeading.value,
        date: taskDate.value,
        description: taskDescription.value
    };

    // Add task to taskData array
    taskData.push(taskObject);
    console.log(taskData); // Log the updated taskData array

    // Clear input fields
    taskHeading.value = '';
    taskDate.value = '';
    taskDescription.value = '';

    // Hide the overlay
    overlay.style.display = "none";
    taskFormCont.style.display = "none";
 render();
});



// this will render the task in html
function render() {
    taskCont.innerHTML = "";
     taskData.forEach((item,index) => { 
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("class","tasks");
        taskDiv.innerHTML = `<div class="task-info" id="task-info">
                    <div class="heading">${item.heading}</div>
                    <div class="date">${item.date}</div>
                    <div class="description">${item.description}</div>
                </div>
                <div class="edit-delete-btn" id="edit-delete-bt">
                    <button class="edit-btn task-btn btn">Edit</button>
                    <button class="delete-btn task-btn btn" id="${index}">Delete</button>
                </div>`;
    taskCont.appendChild(taskDiv);
     })
     attachDeleteListeners();
}



// this will delete the tasks
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




