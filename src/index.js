import { makeToDo, addToDo, deleteToDo, changeStatus, changePriority } from './to-dos.js';
import { makeProject } from './project-generator.js';
import './style.css';

const careForDog = makeProject("Take Care of a Dog");
const feedCopper = makeToDo("Feed Copper", "Give Copper 2 cups of food", "12/1/22", 0);
const waterCopper = makeToDo("Water Copper", "Give Copper 2 cups of water", "11/30/22", 1);
const medCopper = makeToDo("Medicate Copper", "Give Copper 1 tablet", "12/20/22", 1);

//TESTING//
addToDo(careForDog, feedCopper);
addToDo(careForDog, waterCopper);
addToDo(careForDog, medCopper);

function makeCard(obj) {
    const card = document.createElement("div");
    card.classList.add("card");
    const projectTitle = document.createElement("h3");
    projectTitle.textContent = obj.title;
    card.appendChild(projectTitle);

    const listContainer = document.createElement("div");
    card.appendChild(listContainer);
    for(let i=0; i<obj.list.length; i++) {
        const toDoTitle = document.createElement("p");
        const toDoDate = document.createElement("p");
        toDoTitle.textContent = obj.list[i].title;
        toDoDate.textContent = obj.list[i].dueDate;
        listContainer.appendChild(toDoTitle);
        listContainer.appendChild(toDoDate);
    }
    return card;
}

const firstProj = makeCard(careForDog);

function addCard(card) {
    const div = document.querySelector(".project-container");
    div.appendChild(card);
}

addCard(firstProj);
