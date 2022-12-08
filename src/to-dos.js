import { removeModal } from './modal.js';
import { loadPage } from './pgload.js';
import { format, parseISO } from 'date-fns';


export const saveToDo = (e) => {
    
    e.preventDefault();
    const title = document.querySelector("#newTitle").value;
    const desc = document.querySelector("#desc").value;
    let date = document.querySelector("#date").value;
    date = format(parseISO(date), 'MM-dd-yy');
    let priority = "";
    let priorityResult = document.getElementsByName("priority");
    for(let i = 0; i < priorityResult.length; i++) {
        if(priorityResult[i].checked) {
            priority = priorityResult[i].value;
        }
    }
    let project = document.querySelector("#select-option").value;
    for (let i=0; i<localStorage.length; i++) {
        if (project == JSON.parse(localStorage.getItem(localStorage.key(i))).title) {
            project = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
    }
    let newToDo = makeToDo(title, desc, date, priority, project);
    addToDo(project, newToDo);
}

export const makeToDo = (title, description, dueDate, priority) => {
    let status = 0;
    return { title, description, dueDate, priority, status };
}

export const addToDo = (project, toDo) => {
     for (let i=0; i<localStorage.length; i++) {
         if (project.title === JSON.parse(localStorage.getItem(localStorage.key(i))).title) {
            let parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
            parsed.list.push(toDo);
            localStorage.setItem(localStorage.key(i), JSON.stringify(parsed));
         } 
     }
    loadPage();
}

export const deleteToDo = (project, toDo) => {
    for (let i=0; i<localStorage.length; i++) {
            if (project.title === JSON.parse(localStorage.getItem(localStorage.key(i))).title) {
               let parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
               for (let j=0; j<parsed.list.length; j++) {
                if (parsed.list[j].title == toDo.title) {
                    parsed.list.splice(j,1);
                    localStorage.setItem(localStorage.key(i), JSON.stringify(parsed));
                }
               }
            } 
        }
   loadPage();
   removeModal();
}

export const changeStatus = (project, toDo) => {
    for (let i=0; i < project.list.length; i++) {
        if(project.list[i] === toDo) {
            if(project.list[i].status === 0) {
                project.list[i].status = 1;
            } else if (project.list[i].status === 1) {
                project.list[i].status = 0;
            }
        }
    }
}

export const changePriority = (project, toDo) => {
    for (let i=0; i < project.list.length; i++) {
        if(project.list[i] === toDo) {
            if(project.list[i].priority === 0) {
                project.list[i].priority = 1;
            } else if (project.list[i].priority === 1) {
                project.list[i].priority = 0;
            }
        }
    }
}

export const editToDo = (e) => {
    //Remove edit button & append save button
    const buttonDiv = document.querySelector(".button-div");
    const editButton = document.querySelector(".button-div > button");
    const deleteButton = document.querySelector(".button-div > button + button");
    buttonDiv.removeChild(editButton);
    buttonDiv.removeChild(deleteButton);
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Task";
    buttonDiv.appendChild(saveButton);
    buttonDiv.appendChild(deleteButton);
    const modalDiv = document.querySelector(".modal-div");
    const inputList = Array.from(document.querySelectorAll(".modal-div p"));
    
    //Add input field to title section
    const title = document.querySelector(".modal-header h3");
    const titleContent = title.textContent;
    title.innerHTML = "";
    const titleInput = document.createElement("input");
    titleInput.setAttribute("value", titleContent);
    title.appendChild(titleInput);

    //Add input field to description section
    const desc = inputList[0];
    const descContent = desc.textContent;
    desc.innerHTML = "";
    const descInput = document.createElement("input");
    descInput.setAttribute("value", descContent);
    desc.appendChild(descInput);

    //Add input field to due date section
    const date = inputList[1];
    let dateContent = new Date(date.textContent);
    dateContent = format((dateContent), 'yyyy-MM-dd')
    date.innerHTML = "";
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("value", dateContent);
    date.appendChild(dateInput);

    //Add input field to priority section
    const priority = inputList[2];
    const priorityContent = priority.textContent;
    priority.innerHTML = "";
    const priorityInput = document.createElement("select");
    priorityInput.setAttribute("name", "priority");
    priorityInput.setAttribute("id", "priority-select");
    //Create high priority option
    const high = document.createElement("option");
    high.innerHTML = "High priority &#11088;";
    high.setAttribute("value", "high");
    priority.appendChild(priorityInput);
    priorityInput.appendChild(high);
    //Create low priority option
    const low = document.createElement("option");
    low.innerHTML = "Low priority &#9734;";
    low.setAttribute("value", "low");
    priority.appendChild(priorityInput);
    priorityInput.appendChild(low);
    //Set the correct priority default option
    if (priorityContent === high.innerHTML) {
        high.setAttribute("selected","selected");

    } else if (priorityContent === low.innerHTML) {
        low.setAttribute("selected","selected");
    } 

    //Add input field to project section
    const project = inputList[3];
    const projectContent = project.textContent;
    project.innerHTML = "";
    const projectInput = document.createElement("select");
    projectInput.setAttribute("name", "project");
    projectInput.setAttribute("id", "project-select");
    project.appendChild(projectInput);
    //Set the correct project default
    for(let i=0; i < localStorage.length; i++) {
        const option = document.createElement("option");
        const optionTitle = JSON.parse(localStorage.getItem(localStorage.key(i))).title;
        option.setAttribute("value",optionTitle);
        option.textContent = optionTitle;
        projectInput.appendChild(option);
        if (projectContent === option.textContent) {
            option.setAttribute("selected", "selected");
        }
    }

    saveButton.addEventListener("click", () => {
        saveUpdate(titleInput, descInput, dateInput, titleContent);
    })

}

const saveUpdate = (titleInput, descInput, dateInput, titleContent) => {
    let title = titleContent;
    const newTitle = titleInput.value;
    const desc = descInput.value;
    let date = format(parseISO(dateInput.value), 'MM-dd-yy');
    let priority = document.querySelector("#priority-select").value;
    let project = document.querySelector("#project-select").value;
    for (let i=0; i<localStorage.length; i++) {
        if (project == JSON.parse(localStorage.getItem(localStorage.key(i))).title) {
            project = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
    }
    let updatedToDo = makeToDo(title, desc, date, priority, project);
    updateLocalStorage(project, updatedToDo, newTitle);
}

const updateLocalStorage = (project, updatedToDo, newTitle) => {
    for (let i=0; i<localStorage.length; i++) {
        //Loop through local storage to find correct project
        if (project.title === JSON.parse(localStorage.getItem(localStorage.key(i))).title) {
           //Set project from local storage as an object variable
            let parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
           //Loop through to do tasks to find correct task
           for (let j=0; j<parsed.list.length; j++) {
                if(parsed.list[j].title === updatedToDo.title) {
                    //Set original to do task as updated to do task object
                    parsed.list[j] = updatedToDo;
                    parsed.list[j].title = newTitle;
            } 
           } 
           //Set original project in local storage as project object with updated task
           localStorage.setItem(localStorage.key(i), JSON.stringify(parsed));
        } 
    }
    removeModal();
    loadPage();
}