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