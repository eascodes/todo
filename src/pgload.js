import { deleteProject } from './project.js';
import './style.css';
import { clearContent } from './clear.js';
import { buildModal } from './modal.js';


export const loadPage = () => {
    clearContent();
    console.log(localStorage);

    //Set default projects
    if (localStorage.length === 0) {

        let backpackTrip = {
            list: [
                {title: 'Plan route', description: 'Use guidebook to plan hiking route', dueDate: '4/1/23', priority: 1, status: 0},
                {title: 'Plan meals', description: 'Plan meals to meet calorie needs', dueDate: '4/7/23', priority: 0, status: 0},
                {title: 'Pack gear', description: 'Pack gear needed for 10 day trip', dueDate: '4/14/23', priority: 1, status: 0}
            ],
            title: "Prep for Backpacking Trip"
        }

        let loveDog = {
            list: [
                {title: 'Cuddle', description: 'Cuddle with my dog', dueDate: '12/20/22', priority: 1, status: 0}
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
        displayStatus(checkbox, obj.list[i].status, toDoTitle, toDoDate);

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
        addStatusListener(obj.list[i].status, checkbox, toDoTitle, toDoDate, obj, obj.list[i]);

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
function displayStatus(checkbox, status, toDoTitle, toDoDate) {
    if (status === 1) {
        markComplete(checkbox, toDoTitle, toDoDate);
    } else if (status === 0) {
        checkbox.innerHTML = "&#9744;";
    }
}

//Mark task as complete
function markComplete(checkbox, toDoTitle, toDoDate) {
    checkbox.innerHTML = "&#9745;";
    toDoTitle.classList.add("strikethrough");
    toDoDate.classList.add("strikethrough");
}

//Mark task as incomplete
function markIncomplete(checkbox, toDoTitle, toDoDate) {
    checkbox.innerHTML = "&#9744;";
    toDoTitle.classList.remove("strikethrough");
    toDoDate.classList.remove("strikethrough");
}

function addStatusListener(status, checkbox, toDoTitle, toDoDate, proj, toDo) {
    checkbox.addEventListener("click", () => {
        if (status === 0) {
            markComplete(checkbox, toDoTitle, toDoDate);
            updateStatus(proj, toDo);
        } else if (status === 1) {
            markIncomplete(checkbox, toDoTitle, toDoDate);
            updateStatus(proj, toDo);
        }
    })
}

//Update task status in local storage
function updateStatus(project, toDo) {
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
}