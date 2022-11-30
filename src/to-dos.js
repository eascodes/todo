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