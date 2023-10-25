//bundler to use the node modules

import { v4 as uuidv4 } from 'uuid';

type Task ={
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
  }

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const task :Task[]= loadTasks()

task.forEach(addListItem)

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newTask :Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  task.push(newTask)
  addListItem(newTask);
  input.value= ""
});

// function addListItem(task:Task){
//    const item = document.createElement("li")
//    const label = document.createElement("label")
//    const checkbox  =document.createElement("input")
//    checkbox.type = "checkbox"
//    label.append(checkbox,task.title)
//    list?.append(label)
//    list?.append(item)
// }

function addListItem(task: Task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.addEventListener('change',()=>{
        task.completed = checkbox.checked
        console.log(task)
        saveTasks()
    })
    checkbox.type = "checkbox";
    label.append(checkbox, task.title);
    item.appendChild(label); 
    list?.append(item);
    return true
  }
  

  function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(task))
  }

  function loadTasks() :Task[]{
    const taskJSON = localStorage.getItem("TASKS")
    if(taskJSON== null) return []
    return JSON.parse(taskJSON)
  }