export const buildModal = (obj, proj) => {
    // create the background modal div
  const modal = document.createElement('div')
  modal.classList.add('modal')
    // create the inner modal div with appended argument
  const child = document.createElement('div')
  child.classList.add('child')
  //create text
  const modalTitle = document.createElement("h3");
  
  function findProject() {
    for (let i=0; i < localStorage.length; i++) {
      if (obj.title == JSON.parse(localStorage.getItem(localStorage.key(i))).title) {
        console.log("It worked");
      } else { console.log(obj) }
    } 
  }
  findProject();

  const modalDiv = document.createElement("div");
  modalTitle.innerHTML = "&#9634; " + obj.title;
  const modalDescTitle = document.createElement("h4");
  modalDescTitle.innerHTML = "Description:";
  const modalDesc = document.createElement("p");
  modalDesc.textContent = obj.description;
  const modalDateTitle = document.createElement("h4");
  modalDateTitle.innerHTML = "Due Date:"
  const modalDate = document.createElement("p");
  modalDate.textContent = obj.dueDate;
  const modalPriorityTitle = document.createElement("h4");
  modalPriorityTitle.innerHTML = "Priority:"
  const modalPriority = document.createElement("p");
  
  let priorityLevel = "";
  let priorityStar = "";
  if (obj.priority === 1) {
    priorityStar = "&#11088;";
    priorityLevel = "High priority"; 
  } else {
    priorityStar = "&#9734;";
    priorityLevel = "Low priority";}

  modalPriority.innerHTML = priorityLevel + " " + priorityStar;
  const modalProjectTitle = document.createElement("h4");
  modalProjectTitle.innerHTML = "Project:"
  const modalProject = document.createElement("p");
  modalProject.innerHTML = proj.title;
  const modalDelete = document.createElement("button");
  modalDelete.textContent = "Delete Task";
  child.appendChild(modalTitle);
  child.appendChild(modalDiv);
  modalDiv.appendChild(modalDescTitle);
  modalDiv.appendChild(modalDesc);
  modalDiv.appendChild(modalDateTitle);
  modalDiv.appendChild(modalDate);
  modalDiv.appendChild(modalPriorityTitle);
  modalDiv.appendChild(modalPriority);
  modalDiv.appendChild(modalProjectTitle);
  modalDiv.appendChild(modalProject);
  child.appendChild(modalDelete);
  // render the modal with child on DOM
  modal.appendChild(child);
  document.body.appendChild(modal);

  // remove modal if background clicked
  modal.addEventListener('click', event => {
    if (event.target.className === 'modal') {
      removeModal()
    }
  })
}

const removeModal = () => {
    // find the modal and remove if it exists
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.remove()
    }
  }