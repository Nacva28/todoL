const todoInput = document.getElementById("todo-input");
const savebtn = document.getElementById("save-btn");
let todolist = document.getElementById("list-todo");

const allTodos = [];
const deletedTodos = [];

const saveTodoHandler = (e) => {
  const inputValue = todoInput.value;
  if (inputValue.trim() === "") {
    alert("Please Write A ToDo ");
    return;
  }
  if (allTodos.includes(inputValue)) {
    alert("This to do already exist");
    return;
  }
  const inputData = {
    text: inputValue,
    completed: false,
    id: Math.random().toString(),
  };
  allTodos.push(inputValue);

  const newItem = document.createElement("li");
  const textTag = document.createElement("p");
  textTag.innerText = inputData.text;
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "Delete";

  deleteBtn.addEventListener("click", () => {
    const index = allTodos.findIndex((todo) => todo.id === inputData.id);
    allTodos.splice(index, 1);
    deletedTodos.push(inputData);
    todolist.removeChild(newItem);
  });

  const filterBtn = document.createElement("div");
  filterBtn.classList.add("filter-btn");

  newItem.appendChild(deleteBtn);
  newItem.appendChild(textTag);
  newItem.appendChild(filterBtn);

  todolist.appendChild(newItem);

  todoInput.value = "";
};
savebtn.addEventListener("click", saveTodoHandler);
