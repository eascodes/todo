import { makeToDo, addToDo, deleteToDo, changeStatus, changePriority } from './to-dos.js';
import { makeProject } from './project.js';
import './style.css';
import { clearContent } from './clear.js';
import { showToDoForm } from './to-doform.js';


export const loadPage = () => {
    clearContent();

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

    //BUILD THE CARDS//
    function makeCard(obj) {
        const card = document.createElement("div");
        card.classList.add("card");
        const projectTitle = document.createElement("h3");
        projectTitle.textContent = obj.title;
        card.appendChild(projectTitle);

        const listContainer = document.createElement("div");
        card.appendChild(listContainer);
        const toDoList = document.createElement("ul");
        listContainer.appendChild(toDoList);
        for(let i=0; i<obj.list.length; i++) {
            const toDoLine = document.createElement("li");
            toDoList.appendChild(toDoLine);
            const toDoTitle = document.createElement("p");
            const toDoDate = document.createElement("p");
            toDoTitle.textContent = obj.list[i].title;
            toDoDate.textContent = obj.list[i].dueDate;
            toDoLine.appendChild(toDoTitle);
            toDoLine.appendChild(toDoDate);
        }
        return card;
    }

    function addCard(card) {
        const div = document.querySelector(".project-container");
        div.appendChild(card);
    }

    (function createCardDisplay() {
        for (let i=0; i < localStorage.length; i++) {
            //console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            const newCard = makeCard(JSON.parse(localStorage.getItem(localStorage.key(i))));
            addCard(newCard);
        }
    })();
}