import './style.css';
import { showToDoForm } from './to-doform.js';
import { loadPage } from './pgload.js';
import { showProjectForm } from './project.js';

loadPage();

//EVENT LISTENERS//
const homeButton = document.querySelector(".nav>ul>li");
homeButton.addEventListener("click", loadPage);

const addToDoButton = document.querySelector(".nav>ul>li+li");
addToDoButton.addEventListener("click", showToDoForm);

const addProjectButton = document.querySelector(".nav>ul>li+li+li");
addProjectButton.addEventListener("click", showProjectForm);