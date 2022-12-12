import './style.css';
import { showToDoForm } from './to-doform.js';
import { loadPage } from './pgload.js';
import { showProjectForm } from './project.js';

loadPage();

//Clear all content from project container
export const clearContent = () => {
    const content = document.querySelector(".project-container");
    while (content.lastElementChild) {
        content.removeChild(content.lastElementChild);
    }
}

//Add event listeners to nav bar buttons
const homeButton = document.querySelector(".nav>ul>li");
homeButton.addEventListener("click", loadPage);

const addToDoButton = document.querySelector(".nav>ul>li+li");
addToDoButton.addEventListener("click", showToDoForm);

const addProjectButton = document.querySelector(".nav>ul>li+li+li");
addProjectButton.addEventListener("click", showProjectForm);