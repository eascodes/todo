import { makeToDo, addToDo, deleteToDo, changeStatus, changePriority } from './to-dos.js';
import { makeProject } from './project-generator.js';
import './style.css';
import { clearContent } from './clear.js';
import { showToDoForm } from './to-doform.js';

export let projectList = [];

export const loadPage = () => {
    clearContent();

    if (projectList.length === 0) {
        //DEFAULT PROJECT TESTING//
        // let backpackTrip = makeProject("Prep for Backpacking Trip");
        // const planRoute = makeToDo("Plan route", "Use guidebook to plan hiking route", "4/1/23", 1);
        // const planMeals = makeToDo("Plan meals", "Plan meals to meet calorie needs", "4/7/23", 0);
        // const packGear = makeToDo("Pack gear", "Pack gear needed for 10 day trip", "4/14/23", 1);
        // addToDo(backpackTrip, planRoute);
        // addToDo(backpackTrip, planMeals);
        // addToDo(backpackTrip, packGear);

        // let loveDog = makeProject("Love my dog");
        // const cuddleDog = makeToDo("Cuddle", "Cuddle with my dog", "12/1/22", 1);
        // addToDo(loveDog, cuddleDog);

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

        projectList.push(backpackTrip);
        projectList.push(loveDog);
    }

    console.log(projectList);

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
        for (let i=0; i < projectList.length; i++) {
            const newCard = makeCard(projectList[i]);
            addCard(newCard);
        }
    })();
    return projectList;
}