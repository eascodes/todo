import { deleteProject } from './project.js';
import './style.css';
import { clearContent } from './clear.js';
import { buildModal } from './modal.js';
import { reloadModal } from './modal.js';
import { format } from 'date-fns';


export const loadPage = () => {
    clearContent();

    //Set default projects
    if (localStorage.length === 0) {
        let backpackTrip = {
            list: [
                {title: 'Plan route', description: 'Use guidebook to plan hiking route', dueDate: format(new Date("04/05/2023"), 'MM-dd-yy'), priority: 1, status: 0},
                {title: 'Plan meals', description: 'Plan meals to meet calorie needs', dueDate: format(new Date("05/01/2023"), 'MM-dd-yy'), priority: 0, status: 0},
                {title: 'Pack gear', description: 'Pack gear needed for 10 day trip', dueDate: format(new Date("05/15/2023"), 'MM-dd-yy'), status: 0}
            ],
            title: "Prep for Backpacking Trip"
        }

        let loveDog = {
            list: [
                {title: 'Cuddle', description: 'Cuddle with my dog', dueDate: format(new Date("12/25/2022"), 'MM-dd-yy'), priority: 1, status: 0}
            ],
            title: "Love my dog"
        }

        localStorage.setItem("backpackTrip", JSON.stringify(backpackTrip));
        localStorage.setItem("loveDog", JSON.stringify(loveDog));
    }

    

    //Add card to project container
    function addCard(card) {
        const div = document.querySelector(".project-container");
        div.appendChild(card);
    }

    //Create project cards & add to project container
    (function createCardDisplay() {
        for (let i=0; i < localStorage.length; i++) {
            const newCard = makeCard(JSON.parse(localStorage.getItem(localStorage.key(i))));
            addCard(newCard);
        }
    })();
}

    

//Build the project cards
function makeCard(obj) {
    //Create card & project title
    const card = document.createElement("div");
    card.classList.add("card");
    const projectTitle = document.createElement("h3");
    projectTitle.textContent = obj.title;
    card.appendChild(projectTitle);

    //Create container for to do task list
    const listContainer = document.createElement("div");
    card.appendChild(listContainer);
    const toDoList = document.createElement("ul");
    listContainer.appendChild(toDoList);        

    //Create to do task checkbox, title, & due date elements
    for(let i=0; i<obj.list.length; i++) {
        const toDoLine = document.createElement("li");
        toDoList.appendChild(toDoLine);
        const leftDiv = document.createElement("div");
        toDoLine.appendChild(leftDiv);
        const checkbox = document.createElement("p");
        checkbox.classList.add("checkbox");
        const toDoTitle = document.createElement("p");
        const toDoDate = document.createElement("p");

        //Display the correct completion status
        displayStatus(checkbox, obj.list[i], toDoTitle, toDoDate);

        //Display correct priority status
        let priorityStar = "";
        if (obj.list[i].priority === 1 || obj.list[i].priority === "high") {
            priorityStar = "&#11088;"
        }
        if (obj.list[i].title != undefined) {
            toDoTitle.innerHTML = obj.list[i].title + " " + priorityStar;
            toDoDate.innerHTML = obj.list[i].dueDate;
            leftDiv.appendChild(checkbox);
            leftDiv.appendChild(toDoTitle);
            toDoLine.appendChild(toDoDate);
        }

        //Mark to do task complete when checkbox is checked
        addStatusListener(obj.list[i], checkbox, toDoTitle, toDoDate, obj);

        //Build modal when user clicks on task title
        toDoTitle.addEventListener("click", () => {
            buildModal(obj.list[i], obj);
        })
    }

    //Append delete project button
    const deleteProjButton = document.createElement("button");
    deleteProjButton.innerHTML = "Delete Project";
    card.appendChild(deleteProjButton);
    deleteProjButton.addEventListener("click", () => {
        deleteProject(obj);
    })
    return card;
}

//Display correct completion status
export const displayStatus = (checkbox, toDo, toDoTitle, toDoDate) => {
    if (toDo.status === 1) {
        markComplete(checkbox, toDoTitle, toDoDate);
    } else if (toDo.status === 0) {
        checkbox.innerHTML = "&#9744;";
    }
}

//Mark task as complete
const markComplete = (checkbox, toDoTitle, toDoDate) => {
    checkbox.innerHTML = "&#9745;";
    toDoTitle.classList.add("strikethrough");
    toDoDate.classList.add("strikethrough");
}

//Mark task as incomplete
const markIncomplete = (checkbox, toDoTitle, toDoDate) => {
    checkbox.innerHTML = "&#9744;";
    toDoTitle.classList.remove("strikethrough");
    toDoDate.classList.remove("strikethrough");
}

export const addStatusListener = (toDo, checkbox, toDoTitle, toDoDate, proj) => {
    checkbox.addEventListener("click", () => {
        if (toDo.status === 0) {
            markComplete(checkbox, toDoTitle, toDoDate);
            updateStatus(proj, toDo);
        } else if (toDo.status === 1) {
            markIncomplete(checkbox, toDoTitle, toDoDate);
            updateStatus(proj, toDo);
        }
    })
}

//Update task status in local storage
const updateStatus = (project, toDo) => {
    for (let i=0; i<localStorage.length; i++) {
        //Find project in local storage
        if (project.title === JSON.parse(localStorage.getItem(localStorage.key(i))).title) {
           //Set project as an object
            let parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //Find to do task within project
            for (let j=0; j<parsed.list.length; j++) {
                if (parsed.list[j].title == toDo.title) {
                    //Update status of to do task in parsed variable
                    if (parsed.list[j].status === 0) {
                        parsed.list[j].status = 1;
                    } else if (parsed.list[j].status === 1) {
                        parsed.list[j].status = 0;
                    }
                    //Update local storage to match updated parsed variable
                    localStorage.setItem(localStorage.key(i), JSON.stringify(parsed));
                }
               }
        } 
    }
   loadPage();
   reloadModal(toDo, project);
}