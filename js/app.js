<<<<<<< HEAD
/*
	Login Logic
*/
=======
>>>>>>> 476d0c5c6a503a647742e142f1881cab01d9bdd5
$(".LoginRegisterContainer ul li").click(function(){
   alert('hey');  
   if(!$(this).hasClass('active')){
      $(".LoginRegisterContainer .tabs li").each(function(){
         
         $(this).removeClass('active');
      });
      var thisName = $(this).prop("class");
      $(this).addClass('active');
      
      if(name == 'register'){
         $(".loginForm").removeClass('active');
         $(".loginForm").addClass('hidden');
         $(".registerForm").removeClass('hidden');
         $(".registerForm").addClass('active');
         
      } else {
         $(".registerForm").removeClass('active');
         $(".registerForm").addClass('hidden');
         $(".loginForm").removeClass('hidden');
         $(".loginForm").addClass('active');
      }
      
   }
<<<<<<< HEAD
});

/*
	Random Quote generation from five pre-defined quotes. Self-contained.
*/

var quote = {
	quoteText: '',
	quoteAuthor: ''
};

function createQuote(text, author) {
	var newQuote = Object.create(quote);
	newQuote.quoteText = text;
	newQuote.quoteAuthor = author;
	return newQuote;
}

var quotes = [
	createQuote("\"He who is not courageous enough to take risks will accomplish nothing in life.\"","Muhammad Ali"),
	createQuote("\"Things may come to those who wait, but only the things left by those who hustle.\"","Abraham Lincoln"),
	createQuote("\"Design is not just what it looks like and feels like. Design is how it works.\"","Steve Jobs"),
	createQuote("\"Design must reflect the practical and aesthetic in business, but above all, good design must serve people.\"","Thomas J. Watson"),
	createQuote("\"Start by doing what's necessary, then do what's possible, and suddenly you are doing the impossible.\"","Francis of Assisi")
];

function getQuote() {
	var index = Math.floor(Math.random()*quotes.length);
	return quotes[index];
}

function printQuote() {
	var quoteToPrint = getQuote();
	var text = quoteToPrint.quoteText;
	var author = quoteToPrint.quoteAuthor;
	var insertionPoint = document.getElementById("hero-quote-container");

	var quoteElement = document.createElement("h2");
	quoteElement.className = "quote";
	quoteElement.innerHTML = text;
	console.log(quoteElement);
	var authorElement = document.createElement("h3");
	authorElement.className = "quote-author"
	authorElement.innerHTML = author;
	console.log(authorElement);

	insertionPoint.appendChild(quoteElement);
	insertionPoint.appendChild(authorElement);
}

printQuote();


/*
	To-Do List Stuff.
*/

var taskInput = document.getElementById("new-task");
console.log(taskInput);
var addButton = document.getElementById("add-button");
var incompleteTasks = document.getElementById("incomplete-tasks");
var completedTasks = document.getElementById("completed-tasks");

var createNewTask = function(taskString) {
	//<li><input type="checkbox"><label>Pay Bills</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>
	//Create elements to add in
	var listItem = document.createElement("li");
	var taskCheckbox = document.createElement("input");
	var taskLabel = document.createElement("label");
	var editText = document.createElement("input");
	var editButton = document.createElement("button");
	var deleteButton = document.createElement("button");

	//Modify elements to add in
	taskCheckbox.type = "checkbox";
	taskLabel.innerHTML = taskString;
	taskLabel.className = "task-label";
	editText.type = "text";
	editText.value = taskString;
	editButton.className = "edit";
	editButton.innerText = "Edit";
	deleteButton.className = "delete";
	deleteButton.innerText = "Delete";

	//append children to listItem
	listItem.appendChild(taskCheckbox);
	listItem.appendChild(taskLabel);
	listItem.appendChild(editText);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
};

var addNewTask = function() {
	//Adds a new task if there is a string in the text input.
	if (taskInput.value != '') {
		var listItem = createNewTask(taskInput.value);
		bindTaskEvents(listItem, taskCompleted);
		incompleteTasks.appendChild(listItem);
		taskInput.value = '';
	}
};

var editTask = function() {
	//Again, the 'this' in this function is the edit button, so we need it's parent to get and modify the list item.
	var listItem = this.parentNode;
	var textBox = listItem.querySelector("input[type = text]");
	var label = listItem.querySelector("label.task-label");
	var button = listItem.querySelector("button.edit");

	//Set edit classes to enable or disable the edit mode. If disabling edit mode, apply changes to the label.
	var listItemClasses = listItem.classList;
	if (listItemClasses.contains('edit-mode')) {
		listItemClasses.remove('edit-mode');
		label.innerHTML = textBox.value;
		button.innerHTML = 'edit';
	}
	else {
		listItemClasses.add('edit-mode');
		button.innerHTML = 'save';
	}
};

var deleteTask = function() {
	var listItem = this.parentNode;
	var listContainer = listItem.parentNode;

	listContainer.removeChild(listItem);

};

var taskCompleted = function() {
	console.log("Complete task method called.");
	//Appends the List Item to the completed-tasks container. 'this' references the checkbox, so we need its parent to get the list item.
	var listItem = this.parentNode;
	listItem.className = 'complete';
	completedTasks.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
	console.log("Incomplete task method called.");
	//Appends the List Item to the completed-tasks container. 'this' references the checkbox, so we need its parent to get the list item.
	var listItem = this.parentNode;
	listItem.className = '';
	incompleteTasks.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	var checkbox = taskListItem.querySelector("input[type = checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;

	checkbox.onchange = checkBoxEventHandler;
};

//Add an eventlistener to the button that adds a new task.
addButton.addEventListener("click", addNewTask);
//addButton.addEventListener("click", ajaxRequest);

//Loop through all the INCOMPLETE tasks and bind the eventlistener function.
for (var i = 0; i < incompleteTasks.children.length; i++) {
	bindTaskEvents(incompleteTasks.children[i], taskCompleted);
}
//Loop through all the COMPLETED tasks and bind the eventlistener function.
for (var i = 0; i < completedTasks.children.length; i++) {
	bindTaskEvents(completedTasks.children[i], taskIncomplete);
}
=======
});
>>>>>>> 476d0c5c6a503a647742e142f1881cab01d9bdd5
