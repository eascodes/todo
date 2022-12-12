import { clearContent } from "./index.js";
import { loadPage } from "./pgload.js";

export const makeProject = (title) => {
    let list = [];
    return { title, list };
}

export const showProjectForm = () => {
    clearContent();
    buildProjectForm();
}

export const deleteProject = (project) => {
    localStorage.removeItem(project.title);
    loadPage();
}

const buildProjectForm = () => {
    const container = document.querySelector(".project-container");
    const form = document.createElement("form");
    const title = document.createElement("h3");
    title.textContent = "Add a Project";
    container.appendChild(form);
    form.appendChild(title);
    form.setAttribute("id", "newProjectForm");
    form.setAttribute("action", "");
    form.setAttribute("method", "post");
    const div = document.createElement("div");
    form.appendChild(div);

    //Build project input
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", "project");
    newLabel.textContent = "New Project";
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "project-title");
    input.setAttribute("name", "project");
    div.appendChild(newLabel);
    div.appendChild(input);

    //Build submit button
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.textContent = "Submit";
    button.setAttribute("id", "submit-project");
    div.appendChild(button);
    form.addEventListener("submit", () => {
        saveToLocalStorage(input);
    }
    );
}

const saveToLocalStorage = (input) => {
    let emptyObj = {
        list: [""],
        title: input.value
    }
    localStorage.setItem(input.value, JSON.stringify(emptyObj));
}