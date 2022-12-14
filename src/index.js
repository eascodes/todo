import "./style.css";
import { showToDoForm } from "./to-doform";
import { loadPage } from "./pgload";
import { showProjectForm } from "./project";

loadPage();

// Add event listeners to nav bar buttons
const homeButton = document.querySelector(".nav>ul>li");
homeButton.addEventListener("click", loadPage);

const addToDoButton = document.querySelector(".nav>ul>li+li");
addToDoButton.addEventListener("click", showToDoForm);

const addProjectButton = document.querySelector(".nav>ul>li+li+li");
addProjectButton.addEventListener("click", showProjectForm);