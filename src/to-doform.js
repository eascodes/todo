import { clearContent } from "./clear";

export const showToDoForm = () => {
    clearContent();
    const container = document.querySelector(".project-container");
    const form = document.createElement("form");
    const title = document.createElement("h3");
    title.textContent = "Add a 'To Do' Item";
    container.appendChild(form);
    form.appendChild(title);
}
