const todoInput = document.getElementById("todo-input");
const savebtn = document.getElementById("save-btn");
let todolist = document.getElementById("list-todo");

const allFilterBtn = document.getElementById("all");
const completedFilter = document.getElementById("completed");
const deletedFilter = document.getElementById("deleted");

const allTodos = [];
const deletedTodos = [];
let activeTab = "allG";

const createTodoItemHandler = (todo) => {
  const newItem = document.createElement("li");
  const textTag = document.createElement("p");
  textTag.innerText = todo.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "Delete";

  deleteBtn.addEventListener("click", () => {
    const index = allTodos.findIndex((t) => t.id === todo.id);
    allTodos.splice(index, 1);
    deletedTodos.push(todo);
    todolist.removeChild(newItem);
  });

  const filterBtn = document.createElement("div");
  filterBtn.classList.add("filter-btn");
  filterBtn.addEventListener("click", () => {
    if (filterBtn.style.backgroundColor === "green") {
      filterBtn.style.backgroundColor = "transparent";
    } else {
      filterBtn.style.backgroundColor = "green";
    }
  });

  completedFilter.addEventListener("click", () => {
    activeTab = "completed";
    tabSwitchHandler(completedFilter);
    showTodos(completedTodos);
  });

  newItem.appendChild(deleteBtn);
  newItem.appendChild(textTag);
  newItem.appendChild(filterBtn);

  todolist.appendChild(newItem);
};

const showTodos = (todos) => {
  todolist.innerHTML = "";

  todos.forEach((todo) => {
    createTodoItemHandler(todo);
  });
};

const saveTodoHandler = () => {
  const inputValue = todoInput.value.trim();

  if (inputValue === "") {
    alert("Please write a todo");
    return;
  }

  if (allTodos.some((todo) => todo.text === inputValue)) {
    alert("This todo already exists");
    return;
  }

  const inputData = {
    text: inputValue,
    completed: false,
    id: Math.random().toString(),
  };

  allTodos.push(inputData);
  createTodoItemHandler(inputData);

  todoInput.value = "";
};

savebtn.addEventListener("click", saveTodoHandler);

const tabSwitchHandler = (targetElement) => {
  allFilterBtn.classList.remove("active-filter");
  completedFilter.classList.remove("active-filter");
  deletedFilter.classList.remove("active-filter");

  targetElement.classList.add("active-filter");
};

deletedFilter.addEventListener("click", () => {
  activeTab = "deleted";
  tabSwitchHandler(deletedFilter);
  showTodos(deletedTodos);
});

allFilterBtn.addEventListener("click", () => {
  activeTab = "allG";
  tabSwitchHandler(allFilterBtn);
  showTodos(allTodos);
});

const completedTodos = allTodos.filter((todo) => todo.completed);
tabSwitchHandler(completedFilter);
completedFilter.addEventListener("click", () => {
  activeTab = "completed";
  tabSwitchHandler(completedFilter);
  showTodos(completedTodos);
});
