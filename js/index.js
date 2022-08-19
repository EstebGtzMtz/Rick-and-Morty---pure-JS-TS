"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCharacters = void 0;
const characterStatus = {
    Alive: 'isAlive',
    Dead: 'isDead',
    unknown: 'unknown'
};
const specieIcon = {
    Humanoid: 'https://i.pinimg.com/originals/71/38/9b/71389bc51a5bb156fccceb4b6db7b435.png',
    Human: 'https://icon-library.com/images/human-icon-png/human-icon-png-2.jpg',
    Alien: 'https://cdn-icons-png.flaticon.com/512/71/71298.png',
    MythologicalCreature: 'https://cdn4.iconfinder.com/data/icons/mythological-creatures-mythology/100/Dragon-512.png'
};
const fetchCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = 'https://rickandmortyapi.com/api/character/?page=1';
    const res = yield fetch(baseURL);
    const data = yield res.json();
    return data;
});
exports.fetchCharacters = fetchCharacters;
const createCard = (results) => __awaiter(void 0, void 0, void 0, function* () {
    const newCard = document.createElement('div');
    newCard.setAttribute('class', 'newCard');
    const characterInfo = setInfo(results);
    newCard.appendChild(characterInfo);
    return newCard;
});
const setImage = (src) => {
    const image = document.createElement('img');
    image.src = src;
    image.alt = src;
    image.setAttribute('class', 'image');
    return image;
};
const setName = (characterName) => {
    const name = document.createElement('h1');
    name.textContent = characterName;
    return name;
};
const setStatus = (status) => {
    const statusLabel = document.createElement('div');
    statusLabel.textContent = status;
    const classToSet = characterStatus[status];
    statusLabel.setAttribute('class', classToSet);
    return statusLabel;
};
const setSpecie = (specie) => {
    const specieContainer = document.createElement('div');
    specieContainer.setAttribute('class', 'specieContainer');
    const specieIcon = setSpecieIcon(specie);
    const specieName = document.createElement('h3');
    specieName.textContent = specie;
    specieContainer.appendChild(specieName);
    specieContainer.appendChild(specieIcon);
    return specieContainer;
};
const setSpecieIcon = (specie) => {
    const name = removeSpaces(specie);
    console.log(name);
    const iconToset = specieIcon[name];
    const iconImage = document.createElement('img');
    iconImage.src = iconToset;
    iconImage.setAttribute('class', 'specieIcon');
    return iconImage;
};
const charDescription = (status, name, species) => {
    const charDescription = document.createElement('div');
    const isAlive = setStatus(status);
    const charName = setName(name);
    const specie = setSpecie(species);
    charDescription.setAttribute('class', 'charDescriptionContainer');
    charDescription.appendChild(charName);
    charDescription.appendChild(specie);
    charDescription.appendChild(isAlive);
    return charDescription;
};
const removeSpaces = (text) => {
    return text.split(' ').join('');
};
const setInfo = (results) => {
    const info = document.createElement('div');
    info.setAttribute('class', 'infoContainer');
    const characterDescription = charDescription(results.status, results.name, results.species);
    const image = setImage(results.image);
    info.appendChild(image);
    info.appendChild(characterDescription);
    return info;
};
const getContainer = () => __awaiter(void 0, void 0, void 0, function* () {
    const { results } = yield (0, exports.fetchCharacters)();
    const container = document.querySelector('.container');
    results.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        const card = yield createCard(el);
        container === null || container === void 0 ? void 0 : container.appendChild(card);
    }));
});
getContainer();
