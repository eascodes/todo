export const buildModal = (obj) => {
    // create the background modal div
  const modal = document.createElement('div')
  modal.classList.add('modal')
    // create the inner modal div with appended argument
  const child = document.createElement('div')
  child.classList.add('child')
  //create text
  const modalTitle = document.createElement("h3");
  modalTitle.textContent = obj.title;
    const modalDesc = document.createElement("p");
    modalDesc.textContent = obj.description;
    child.appendChild(modalTitle);
    child.appendChild(modalDesc);
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