import { loadPage } from './pgload.js';



export const saveToDo = () => {
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
    const newToDo = makeToDo(title, desc, date, priority);
    return newToDo;
}

export const makeToDo = (title, description, dueDate, priority) => {
    let status = 0;
    return { title, description, dueDate, priority, status };
}

export const addToDo = (project, toDo) => {
    project.list.push(toDo);
}

export const deleteToDo = (project, toDo) => {
    for (let i=0; i < project.list.length; i++) {
        if(project.list[i] === toDo) {
            project.list.splice(i,1);
        }
    }
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