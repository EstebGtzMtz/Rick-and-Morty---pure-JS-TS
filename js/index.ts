
interface IInfoResponse{
  info: IInfoFromFetch
  results: ICharacter[]
}

interface IInfoFromFetch {
  count: number
  pages: number
  next: string
  prev: null | string
}

interface ICharacter {
  id: number
  name: string
  gender: string
  image: string
  species: string
  status: string
  type: string
}

interface ICharacterStatus {
  Alive: string
  Dead: string
  unknown: string
}

const characterStatus = {
  Alive: 'isAlive',
  Dead: 'isDead',
  unknown: 'unknown'
}

const specieIcon = {
  Humanoid: 'https://i.pinimg.com/originals/71/38/9b/71389bc51a5bb156fccceb4b6db7b435.png',
  Human: 'https://icon-library.com/images/human-icon-png/human-icon-png-2.jpg',
  Alien: 'https://cdn-icons-png.flaticon.com/512/71/71298.png',
  MythologicalCreature: 'https://cdn4.iconfinder.com/data/icons/mythological-creatures-mythology/100/Dragon-512.png'

}

export const fetchCharacters = async () => {
  const baseURL = 'https://rickandmortyapi.com/api/character/?page=1';
  const res = await fetch(baseURL);
  const data:IInfoResponse = await res.json()
  return data
}


const createCard = async (results: ICharacter) => {
  const newCard = document.createElement('div');
  newCard.setAttribute('class', 'newCard')
  const characterInfo = setInfo(results);
  newCard.appendChild(characterInfo)
  return newCard;
}

const setImage = (src: string) => {
  const image = document.createElement('img');
  image.src = src;
  image.alt = src;
  image.setAttribute('class', 'image');
  return image
}

const setName = (characterName:string) => {
  const name = document.createElement('h1');
  name.textContent = characterName
  return name;
}

const setStatus = (status: string) => {
  const statusLabel = document.createElement('div');
  statusLabel.textContent = status
  const classToSet: string = characterStatus[status]
  statusLabel.setAttribute('class', classToSet)
  return statusLabel;
}

const setSpecie = (specie: string) => {
  const specieContainer = document.createElement('div');
  specieContainer.setAttribute('class', 'specieContainer')
  const specieIcon = setSpecieIcon(specie)
  const specieName = document.createElement('h3')
  specieName.textContent = specie;
  specieContainer.appendChild(specieName);
  specieContainer.appendChild(specieIcon)
  return specieContainer;
}

const setSpecieIcon = (specie: string) =>{
  const name = removeSpaces(specie)
  console.log(name)
  const iconToset = specieIcon[name]
  const iconImage = document.createElement('img');
  iconImage.src = iconToset;
  iconImage.setAttribute('class', 'specieIcon')
  return iconImage;
}

const charDescription = (status: string, name: string, species: string) => {
  const charDescription = document.createElement('div');
  const isAlive = setStatus(status);
  const charName = setName(name);
  const specie = setSpecie(species);
  charDescription.setAttribute('class', 'charDescriptionContainer')
  charDescription.appendChild(charName);
  charDescription.appendChild(specie);
  charDescription.appendChild(isAlive);
  return charDescription;
}

const removeSpaces = (text: string)=>{
  return text.split(' ').join('');
}

const setInfo = (results: ICharacter) => {
  const info = document.createElement('div')
  info.setAttribute('class', 'infoContainer')
  const characterDescription = charDescription(results.status, results.name, results.species)
  const image = setImage(results.image);
  info.appendChild(image)
  info.appendChild(characterDescription)

  return info;
}

const getContainer = async () => {
  const {results} = await fetchCharacters()
  const container = document.querySelector('.container');
  results.map(async (el) => {
    const card = await createCard(el)
    container?.appendChild(card)
  })
}

getContainer()