const initialCards = [
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


// generate card with js

// Select the parent element where the cards will be appended
const cardList = document.getElementById('cardList');

// Select the template element
const cardTemplate = document.getElementById('card-template').content;

// Function to create a card element from a template
function createCard(cardData) {
  // Clone the template content
  const cardElement = cardTemplate.cloneNode(true);

  // Select and populate the cloned elements
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  return cardElement;
}

// Iterate over the initialCards array and append each card to the list
initialCards.forEach(cardData => {
  const card = createCard(cardData);
  cardList.appendChild(card);
});


// pop up function
const popUp = document.querySelector('.popup');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button')
  


// find the form in the DOM
const profileFormElement = document.querySelector('.popup__form');

// find the form fields in the DOM
const nameInput = document.getElementById('name-input');
const jobInput = document.getElementById('description-input');

// find the profile elements in the DOM
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');


const formElement = document.querySelector('.popup__submit')

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
 
  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;

  // Update the textContent of the profile elements
  profileName.textContent = nameValue;
  profileJob.textContent = descriptionValue;
}

// connect the handler to the form:
// it will watch the submit event
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// open and close edit modal function
function openPopup() {
    popUp.classList.add('popup_opened')
}

function closePopup() {
    popUp.classList.remove('popup_opened')
}
function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup();
}

editButton.addEventListener('click', fillProfileForm);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('click', closePopup);