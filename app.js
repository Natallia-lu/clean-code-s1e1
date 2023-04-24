//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incompleteTasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New task list item
var createNewTaskElement=function(taskString) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");
     label.innerText = taskString;
    label.className = 'task';
    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.className = "delete";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);
    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

var addTask = function() {
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

//Edit an existing task.
var editTask = function() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("editMode");

    if(containsClass) {
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    } else {
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    };

    listItem.classList.toggle("editMode");
};

//Delete task.
var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
};

//Mark task completed
var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function() {
    console.log("AJAX Request");
};

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}; 

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
};

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
};