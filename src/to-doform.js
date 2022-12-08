import { clearContent } from "./clear";
import { saveToDo } from "./to-dos";

export const showToDoForm = () => {
    clearContent();
    buildToDoForm();
}

const buildToDoForm = () => {
    //Build form container & title
    const container = document.querySelector(".project-container");
    const form = document.createElement("form");
    const title = document.createElement("h3");
    title.textContent = "Add 'To Do' Item";
    container.appendChild(form);
    form.appendChild(title);
    form.setAttribute("id", "newToDoForm");
    form.setAttribute("action", "");
    form.setAttribute("method", "post");
    const div = document.createElement("div");
    form.appendChild(div);
    const list = document.createElement("ul");
    div.appendChild(list);

    //Build questions
    buildTextInput(list, "firstItem", "newTitle", "To Do Item Title*", "input1", "text");
    buildTextInput(list, "secItem", "desc", "Description*", "input2", "text");
    buildTextInput(list, "thirdItem", "date", "Due Date*", "input3", "date");
    buildRadioInput(list, "priority", "high-priority", "High Priority", "input4", "high", "low-priority", "Low Priority", "input5", "low");

    //Build project question
    const liName = document.createElement("li");
    const selectLabel = document.createElement("label");
    selectLabel.textContent = "Project*";
    selectLabel.setAttribute("for", "select-option");
    const select = document.createElement("select");
    select.setAttribute("name", "Project");
    select.setAttribute("id", "select-option");
    list.appendChild(liName);
    liName.appendChild(selectLabel);
    liName.appendChild(select);
    //Loop through local storage to populate project titles
    for(let i=0; i < localStorage.length; i++) {
        const option = document.createElement("option");
        const optionTitle = JSON.parse(localStorage.getItem(localStorage.key(i))).title;
        option.setAttribute("value",optionTitle);
        option.textContent = optionTitle;
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
    inputName.setAttribute("required", "required");
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
        liName.appendChild(input);
        liName.appendChild(newLabel);
    }

    buildRadioOption(category, label1, text1, input1, value1);
    buildRadioOption(category, label2, text2, input2, value2);
}