let initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
]

// pop up function
let popUp = document.querySelector('.popup');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button')

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function openPopup() {
    popUp.style.display = 'flex';
}

function closePopup() {
    popUp.style.display = 'none';
}



// find the form in the DOM
let profileFormElement = document.querySelector('.popup__form');

// find the form fields in the DOM
let nameInput = document.getElementById('name-input');
let jobInput = document.getElementById('description-input');

// find the profile elements in the DOM
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');


let formElement = document.querySelector('.popup__submit')

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
 
  let nameValue = nameInput.value;
  let breedValue = breedInput.value;

  // Update the textContent of the profile elements
  profileName.textContent = nameValue;
  profileBreed.textContent = breedValue;

}

// connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);