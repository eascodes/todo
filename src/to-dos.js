import { removeModal } from './modal.js';
import { loadPage } from './pgload.js';



export const saveToDo = (e) => {
    
    e.preventDefault();
    const title = document.querySelector("#newTitle").value;
    const desc = document.querySelector("#desc").value;
    const date = document.querySelector("#date").value;
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

export const editToDo = () => {
    const modalDiv = document.querySelector(".modal-div");
    const inputList = Array.from(document.querySelectorAll(".modal-div p"));
    
    //Add input field to description section
    const desc = inputList[0];
    const descContent = desc.textContent;
    desc.innerHTML = "";
    const descInput = document.createElement("input");
    descInput.setAttribute("value", descContent);
    desc.appendChild(descInput);

    //Add input field to due date section
    const date = inputList[1];
    const dateContent = date.textContent;
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
    priorityInput.setAttribute("id", "select-option");
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
    projectInput.setAttribute("name", "priority");
    projectInput.setAttribute("id", "select-option");
    project.appendChild(projectInput);
    //
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

}