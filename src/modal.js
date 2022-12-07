import { addStatusListener, displayStatus } from "./pgload"
import { deleteToDo } from "./to-dos"

export const buildModal = (obj, proj) => {
  //Create the background modal div
  const modal = document.createElement('div')
  modal.classList.add('modal')

  //Create the inner modal div
  const child = document.createElement('div')
  child.classList.add('child')

  //Create content
  const modalHeader = document.createElement("div");
  const modalTitle = document.createElement("h3");
  const modalCheckbox = document.createElement("p");
  const modalDiv = document.createElement("div");
  const modalDescTitle = document.createElement("h4");
  const modalDesc = document.createElement("p");
  const modalDateTitle = document.createElement("h4");
  const modalDate = document.createElement("p");

  modalHeader.classList.add("modal-header");
  modalDiv.classList.add("modal-div");
  modalCheckbox.classList.add("checkbox");

  modalCheckbox.innerHTML = "&#9634;";
  modalTitle.innerHTML = obj.title;
  modalDescTitle.innerHTML = "Description:";
  modalDesc.innerHTML = obj.description;
  modalDateTitle.innerHTML = "Due Date:"
  modalDate.innerHTML = obj.dueDate;

  //PICK UP HERE
  addStatusListener(obj, modalCheckbox, modalTitle, modalDate, proj);
  displayStatus(modalCheckbox, obj, modalTitle, modalDate);

  modalHeader.appendChild(modalCheckbox);
  modalHeader.appendChild(modalTitle);  

  //Set correct priority status content
  const modalPriorityTitle = document.createElement("h4");
  modalPriorityTitle.innerHTML = "Priority:"
  const modalPriority = document.createElement("p");
  
  let priorityLevel = "";
  let priorityStar = "";
  if (obj.priority === 1 || obj.priority === "high") {
    priorityStar = "&#11088;";
    priorityLevel = "High priority"; 
  } else {
    priorityStar = "&#9734;";
    priorityLevel = "Low priority";}

  modalPriority.innerHTML = priorityLevel + " " + priorityStar;
  const modalProjectTitle = document.createElement("h4");
  modalProjectTitle.innerHTML = "Project:"
  
  //Set correct project content
  const modalProject = document.createElement("p");
  modalProject.innerHTML = proj.title;

  //Add edit & delete buttons
  const modalEdit = document.createElement("button");
  modalEdit.textContent = "Edit Task";
  const modalDelete = document.createElement("button");
  modalDelete.textContent = "Delete Task";
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");

  //Append content to modal
  child.appendChild(modalHeader);
  child.appendChild(modalDiv);
  modalDiv.appendChild(modalDescTitle);
  modalDiv.appendChild(modalDesc);
  modalDiv.appendChild(modalDateTitle);
  modalDiv.appendChild(modalDate);
  modalDiv.appendChild(modalPriorityTitle);
  modalDiv.appendChild(modalPriority);
  modalDiv.appendChild(modalProjectTitle);
  modalDiv.appendChild(modalProject);
  child.appendChild(buttonDiv);
  buttonDiv.appendChild(modalEdit);
  buttonDiv.appendChild(modalDelete);
  modal.appendChild(child);
  document.body.appendChild(modal);
  
  //Delete to do task if delete button clicked
  modalDelete.addEventListener("click", () => {
    deleteToDo(proj, obj);
  });

  // Remove modal if background clicked
  modal.addEventListener('click', event => {
    if (event.target.className === 'modal') {
      removeModal()
    }
  })
}

//Find the modal and remove if it exists
export const removeModal = () => {
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.remove()
    }
  }

export const reloadModal = (obj, proj) => {
    const modal = document.querySelector('.modal')
    if (modal) {
      removeModal();
      buildModal(obj, proj);
    }
}
