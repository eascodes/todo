/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { format, parseISO } from "date-fns";
import { removeModal } from "./modal";
import { loadPage } from "./pgload";

export const addToDo = (project, toDo) => {
  for (let i = 0; i < localStorage.length; i += 1) {
    if (
      project.title ===
      JSON.parse(localStorage.getItem(localStorage.key(i))).title
    ) {
      const parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
      parsed.list.push(toDo);
      localStorage.setItem(localStorage.key(i), JSON.stringify(parsed));
    }
  }
  loadPage();
};

export const makeToDo = (title, description, dueDate, priority, project) => {
  const status = 0;
  return { title, description, dueDate, priority, status, project };
};

export const saveToDo = (e) => {
  e.preventDefault();
  // Save user input as variables
  const title = document.querySelector("#newTitle").value;
  const desc = document.querySelector("#desc").value;
  let date = document.querySelector("#date").value;
  date = format(parseISO(date), "MM-dd-yy");
  let priority = "";
  const priorityResult = document.getElementsByName("priority");
  for (let i = 0; i < priorityResult.length; i+= 1) {
    if (priorityResult[i].checked) {
      priority = priorityResult[i].value;
    }
  }
  let project = document.querySelector("#select-option").value;
  for (let i = 0; i < localStorage.length; i+= 1) {
    if (
      project === JSON.parse(localStorage.getItem(localStorage.key(i))).title
    ) {
      project = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
  }
  // Create to do task object from user input
  const newToDo = makeToDo(title, desc, date, priority, project.title);
  // Push new to do task to selected project
  addToDo(project, newToDo);
};

export const deleteToDo = (project, toDo) => {
  for (let i = 0; i < localStorage.length; i+= 1) {
    if (
      project.title ===
      JSON.parse(localStorage.getItem(localStorage.key(i))).title
    ) {
      const parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
      for (let j = 0; j < parsed.list.length; j+= 1) {
        if (parsed.list[j].title === toDo.title) {
          parsed.list.splice(j, 1);
          localStorage.setItem(localStorage.key(i), JSON.stringify(parsed));
        }
      }
    }
  }
  loadPage();
  removeModal();
};

export const changeStatus = (project, toDo) => {
  for (let i = 0; i < project.list.length; i+= 1) {
    if (project.list[i] === toDo) {
      if (project.list[i].status === 0) {
        project.list[i].status = 1;
      } else if (project.list[i].status === 1) {
        project.list[i].status = 0;
      }
    }
  }
};

export const changePriority = (project, toDo) => {
  for (let i = 0; i < project.list.length; i+= 1) {
    if (project.list[i] === toDo) {
      if (project.list[i].priority === 0) {
        project.list[i].priority = 1;
      } else if (project.list[i].priority === 1) {
        project.list[i].priority = 0;
      }
    }
  }
};

// Update projects
const changeProject = (newProject, oldProjectTitle, toDo) => {
  let oldProject = "";
  // Set new project variable to equal the project object from local storage
  for (let i = 0; i < localStorage.length; i += 1) {
    if (
      newProject === JSON.parse(localStorage.getItem(localStorage.key(i))).title
    ) {
      newProject = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
  }
  for (let i = 0; i < localStorage.length; i += 1) {
    // Loop thru local storage to find old project
    if (
      oldProjectTitle ===
      JSON.parse(localStorage.getItem(localStorage.key(i))).title
    ) {
      oldProject = JSON.parse(localStorage.getItem(localStorage.key(i)));
      for (let j = 0; j < oldProject.list.length; j +=1) {
        if (oldProject.list[j].title === toDo.title) {
          // Delete task from old project
          oldProject.list.splice(j, 1);
          if (newProject.title === toDo.project) {
            // Add task to new project
            newProject.list.push(toDo);
          }
        }
        // Set old project in local storage as updated project object with task removed
        localStorage.setItem(localStorage.key(i), JSON.stringify(oldProject));
        // Set new project in local storage as updated project object with task added
        for (let k = 0; k < localStorage.length; k+= 1) {
          if (
            newProject.title ===
            JSON.parse(localStorage.getItem(localStorage.key(k))).title
          ) {
            localStorage.setItem(
              localStorage.key(k),
              JSON.stringify(newProject)
            );
          }
        }
      }
    }
  }
};


const updateLocalStorage = (
  project,
  updatedToDo,
  newTitle,
  oldProjectTitle
) => {
  for (let i = 0; i < localStorage.length; i+= 1) {
    // Loop through local storage to find correct project
    if (
      project.title ===
      JSON.parse(localStorage.getItem(localStorage.key(i))).title
    ) {
      // Set project from local storage as an object variable
      const parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
      // Loop through to do tasks to find correct task
      for (let j = 0; j < parsed.list.length; j+= 1) {
        if (parsed.list[j].title === updatedToDo.title) {
          // Set original to do task as updated to do task object
          parsed.list[j] = updatedToDo;
          parsed.list[j].title = newTitle;
        }
      }
      // Set original project in local storage as project object with updated task
      localStorage.setItem(localStorage.key(i), JSON.stringify(parsed));
    }
  }

  // If the user changed the project, update the projects to match change
  if (oldProjectTitle !== updatedToDo.project) {
    changeProject(updatedToDo.project, oldProjectTitle, updatedToDo);
  }
  removeModal();
  loadPage();
};

const saveUpdate = (
  titleInput,
  descInput,
  dateInput,
  titleContent,
  oldProjectTitle
) => {
  // Set variables for user input
  const title = titleContent;
  const newTitle = titleInput.value;
  const desc = descInput.value;
  const date = format(parseISO(dateInput.value), "MM-dd-yy");
  const priority = document.querySelector("#priority-select").value;
  let project = document.querySelector("#project-select").value;
  for (let i = 0; i < localStorage.length; i+= 1) {
    if (
      project === JSON.parse(localStorage.getItem(localStorage.key(i))).title
    ) {
      project = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
  }
  // Make updated to do task object based on user input
  const updatedToDo = makeToDo(title, desc, date, priority, project.title);
  // Update to do task & associated project in local storage
  updateLocalStorage(project, updatedToDo, newTitle, oldProjectTitle);
};

export const editToDo = () => {
  // Remove edit button & append save button
  const buttonDiv = document.querySelector(".button-div");
  const editButton = document.querySelector(".button-div > button");
  const deleteButton = document.querySelector(".button-div > button + button");
  buttonDiv.removeChild(editButton);
  buttonDiv.removeChild(deleteButton);
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Task";
  buttonDiv.appendChild(saveButton);
  buttonDiv.appendChild(deleteButton);
  const inputList = Array.from(document.querySelectorAll(".modal-div p"));

  // Add input field to title section
  const title = document.querySelector(".modal-header h3");
  const titleContent = title.textContent;
  title.textContent = "";
  const titleInput = document.createElement("input");
  titleInput.setAttribute("value", titleContent);
  title.appendChild(titleInput);

  // Add input field to description section
  const desc = inputList[0];
  const descContent = desc.textContent;
  desc.textContent = "";
  const descInput = document.createElement("input");
  descInput.setAttribute("value", descContent);
  desc.appendChild(descInput);

  // Add input field to due date section
  const date = inputList[1];
  let dateContent = new Date(date.textContent);
  dateContent = format(dateContent, "yyyy-MM-dd");
  date.textContent = "";
  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("value", dateContent);
  date.appendChild(dateInput);

  // Add input field to priority section
  const priority = inputList[2];
  const priorityContent = priority.textContent;
  priority.textContent = "";
  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("name", "priority");
  priorityInput.setAttribute("id", "priority-select");
  // Create high priority option
  const high = document.createElement("option");
  high.innerHTML = "High priority &#11088;";
  high.setAttribute("value", "high");
  priority.appendChild(priorityInput);
  priorityInput.appendChild(high);
  // Create low priority option
  const low = document.createElement("option");
  low.innerHTML = "Low priority &#9734;";
  low.setAttribute("value", "low");
  priority.appendChild(priorityInput);
  priorityInput.appendChild(low);
  // Set the correct priority default option
  if (priorityContent === high.textContent) {
    high.setAttribute("selected", "selected");
  } else if (priorityContent === low.textContent) {
    low.setAttribute("selected", "selected");
  }

  // Add input field to project section
  const project = inputList[3];
  const projectContent = project.textContent;
  project.textContent = "";
  const projectInput = document.createElement("select");
  projectInput.setAttribute("name", "project");
  projectInput.setAttribute("id", "project-select");
  project.appendChild(projectInput);
  // Set the correct project default
  let oldProjectTitle = "";
  for (let i = 0; i < localStorage.length; i+= 1) {
    const option = document.createElement("option");
    const optionTitle = JSON.parse(
      localStorage.getItem(localStorage.key(i))
    ).title;
    option.setAttribute("value", optionTitle);
    option.textContent = optionTitle;
    projectInput.appendChild(option);
    if (projectContent === option.textContent) {
      option.setAttribute("selected", "selected");
      oldProjectTitle = option.textContent;
    }
  }

  saveButton.addEventListener("click", () => {
    saveUpdate(titleInput, descInput, dateInput, titleContent, oldProjectTitle);
  });
};