import { makeToDo, addToDo, deleteToDo, changeStatus, changePriority } from './to-dos.js';
import { makeProject } from './project-generator.js';

const careForDog = makeProject("Take Care of a Dog");
const feedCopper = makeToDo("Feed Copper", "Give Copper 2 cups of food", "12/1/22", 0);
const waterCopper = makeToDo("Water Copper", "Give Copper 2 cups of water", "11/30/22", 1);
const medCopper = makeToDo("Medicate Copper", "Give Copper 1 tablet", "12/20/22", 1);

addToDo(careForDog, feedCopper);
addToDo(careForDog, waterCopper);
addToDo(careForDog, medCopper);

changePriority(careForDog, feedCopper);
console.log(careForDog);