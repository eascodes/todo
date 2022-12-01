import { clearContent } from "./clear";

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
    const div = document.createElement("div");
    form.appendChild(div);
    const list = document.createElement("ul");
    div.appendChild(list);

    

    buildTextInput(list, "firstItem", "newTitle", "To Do Item Title", "input1", "text");
    buildTextInput(list, "secItem", "desc", "Description", "input2", "text");
    buildTextInput(list, "thirdItem", "date", "Due Date", "input3", "date");
    buildRadioInput(list, "priority", "high-priority", "High Priority", "input4", "high", "low-priority", "Low Priority", "input5", "low");
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

    buildRadioOption(container, category, label1, text1, input1, value1);
    buildRadioOption(container, category, label2, text2, input2, value2);
}