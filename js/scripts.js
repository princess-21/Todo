// Constructor for Todo
function Todo() {
    this.tasks = {}; // Store tasks as objects with unique IDs
    this.tasksId = 0; // Track unique task IDs
}

// Constructor for Task
function Task(taskDescription) {
    this.description = taskDescription;
    this.done = false; // Default state for a new task
}

// Method to add a task
Todo.prototype.addTask = function (task) {
    task.id = this.addId(); // Assign an ID to the task
    this.tasks[task.id] = task; // Store the task with its unique ID
};

// Method to generate a new ID
Todo.prototype.addId = function () {
    this.tasksId += 1; // Increment the ID
    return this.tasksId; // Return the new ID
};

// Method to delete a task by its ID
Todo.prototype.deleteTask = function (id) {
    if (this.tasks[id] === undefined) {
        return false; // Task not found
    }
    delete this.tasks[id]; // Delete the task
    return true;
};

// Method to find a task by its ID
Todo.prototype.findTask = function (id) {
    if (this.tasks[id] !== undefined) {
        return this.tasks[id]; // Return the task if found
    }
    return false;
};

// UI Logic to display the tasks
function displayDetails(todo) {
    let todoList = $("ul#todo"); // Target the unordered list
    let htmlForTodoInfo = ""; // Initialize HTML string

    Object.keys(todo.tasks).forEach(function (key) {
        const task = todo.findTask(key); // Find task by its ID
        htmlForTodoInfo += `<li id="${task.id}">
            <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''}>
            ${task.description}
            <button class="delete-btn" data-id="${task.id}">X</button>
        </li>`;
    });

    todoList.html(htmlForTodoInfo); // Update the list in the DOM

    // Event listener for the checkboxes
    $(".task-checkbox").change(function () {
    const taskId = $(this).closest("li").attr("id"); // Get the ID from the parent <li>
    const task = todo.findTask(taskId); // Find the task by ID
    if (task) {
        task.done = this.checked; // Update the task's done status
        
        // Add or remove a class to strike through the text
        if (this.checked) {
            $(this).closest("li").addClass("completed");
        } else {
            $(this).closest("li").removeClass("completed");
        }
    }
});

}

$(document).ready(function () {
    let todo = new Todo(); // Create a new Todo instance

    // Event listener for the "Add" button
    $("button").click(function (event) {
        event.preventDefault(); // Prevent default button behavior

        const inputtedTodo = $("input#text").val(); // Get the input value
        if (inputtedTodo) {
            let newTask = new Task(inputtedTodo); // Create a new task
            todo.addTask(newTask); // Add the task to the todo list
            displayDetails(todo); // Update the task list display
            $("input#text").val(''); // Clear the input field
        }
    });

    // Event listener for deleting tasks
    $(document).on("click", ".delete-btn", function () {
        const taskId = $(this).data("id"); // Get the task ID from the button's data-id
        todo.deleteTask(taskId); // Delete the task from the todo object
        displayDetails(todo); // Refresh the task list display
    });
});
