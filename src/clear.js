export const clearContent = () => {
    const content = document.querySelector(".project-container");
    while (content.lastElementChild) {
        content.removeChild(content.lastElementChild);
    }
}