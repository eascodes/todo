import { clearContent } from "./clear";
import { saveToDo } from "./to-dos";
import { loadPage } from "./pgload";
import { projectList } from "./pgload";

export const showToDoForm = () => {
    clearContent();
    buildToDoForm();
}

const buildToDoForm = () => {
    //Build form container & title
    const container = document.querySelector(".project-container");
    const form = document.createElement("form");
    const title = document.createElement("h3");
    title.textContent = "Add a 'To Do' Item";
    container.appendChild(form);
    form.appendChild(title);
    form.setAttribute("id", "newToDoForm");
    form.setAttribute("action", "");
    form.setAttribute("method", "post");
    const div = document.createElement("div");
    form.appendChild(div);
    const list = document.createElement("ul");
    div.appendChild(list);

    console.log(projectList);

    //Build questions
    buildTextInput(list, "firstItem", "newTitle", "To Do Item Title", "input1", "text");
    buildTextInput(list, "secItem", "desc", "Description", "input2", "text");
    buildTextInput(list, "thirdItem", "date", "Due Date", "input3", "date");
    buildRadioInput(list, "priority", "high-priority", "High Priority", "input4", "high", "low-priority", "Low Priority", "input5", "low");

    //Build project question
    //const projectList = loadPage();
    const liName = document.createElement("li");
    const select = document.createElement("select");
    select.setAttribute("name", "Project");
    list.appendChild(liName);
    liName.appendChild(select);
    for(let i=0; i < projectList.length; i++) {
        console.log(projectList[i].title);
        const option = document.createElement("option");
        option.setAttribute("value",projectList[i].title);
        option.textContent = projectList[i].title;
        select.appendChild(option);
    }

    //Build submit button
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.textContent = "Submit";
    button.setAttribute("id", "submit-todo");
    div.appendChild(button);
    form.addEventListener("submit", saveToDo);
}

const buildTextInput = (container, liName, labelName, textContent, inputName, inputType) => {
    liName = document.createElement("li");
    const newLabel = document.createElement("label");
    newLabel.setAttribute("for", labelName);
    newLabel.textContent = textContent;
    inputName = document.createElement("input");
    inputName.setAttribute("type", inputType);
    inputName.setAttribute("id", labelName);
    inputName.setAttribute("name", labelName);
    container.appendChild(liName);
    liName.appendChild(newLabel);
    liName.appendChild(inputName);
}

const buildRadioInput = (container, category, label1, text1, input1, value1, label2, text2, input2, value2) => {
    const liName = document.createElement("li");
    container.appendChild(liName);

    const buildRadioOption = (category, label, text, input, value) => {
        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", label);
        newLabel.textContent = text;
        input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", label);
        input.setAttribute("name", category);
        input.setAttribute("value", value);
        liName.appendChild(newLabel);
        liName.appendChild(input);
    }

    buildRadioOption(category, label1, text1, input1, value1);
    buildRadioOption(category, label2, text2, input2, value2);
}