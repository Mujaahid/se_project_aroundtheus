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
const cardList = document.getElementById('cardList');
// Select the template element
const cardTemplate = document.getElementById('card-template').content;




// open modual Add card function
const AddPopup = document.querySelector('.add__popup');
const addCard = document.querySelector('.profile__add-button');
const closeAddCardButton = document.querySelector('.add__popup--close-button');

function openAddPopup() {
    AddPopup.classList.add('popup_opened')
}
function closeAddPopup() {
    AddPopup.classList.remove('popup_opened')
}

addCard.addEventListener('click', openAddPopup);
closeAddCardButton.addEventListener('click', closeAddPopup);

// add card
const submitAddcard = document.querySelector('.add__popup-submit');
const cardsList = document.querySelector('.cards__list');
const addCardTitleInput = document.getElementById('add__popup--name');
const addCardImageInput = document.getElementById('add__popup--url');




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

// Function to create a new card
function createNewCard(title, imageUrl) {
    const cardElement = cardTemplate.cloneNode(true);

    // Fill the card with content
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = imageUrl;

    return cardElement;
}

// Iterate over the initialCards array and append each card to the list
initialCards.forEach(cardData => {
    const card = createCard(cardData);
    cardsList.appendChild(card);
});

// Event listener for the add button
submitAddcard.addEventListener('click', (e) => {
    e.preventDefault();

    const title = addCardTitleInput.value;
    const imageUrl = addCardImageInput.value;

    if (title && imageUrl) {
      const newCard = createNewCard(title, imageUrl);
      cardsList.prepend(newCard);
      addCardTitleInput.value = '';
      addCardImageInput.value = '';
      document.querySelector('.add__popup').classList.remove('popup_opened');
    }
});







const cards = document.querySelectorAll('.card');
const popup = document.querySelector('.picture__popup');
const popupImage = document.querySelector('.picture__popup-image');
const popupTitle = document.querySelector('.picture__popup-title');
const closePopupModal = document.querySelector('.picture__popup--close');

function popupImageFunction(title, imageUrl) {
    popupImage.src = imageUrl;
    popupTitle.textContent = title;
    popup.classList.add('popup_opened');
}
function closePopupFunction() {
    popup.classList.remove('popup_opened');
}
closePopupModal.addEventListener('click', closePopupFunction);

cards.forEach(cardElement => {
    cardElement.addEventListener('click', () => {
        const cardTitle = cardElement.querySelector('.card__title').textContent;
        const cardImage = cardElement.querySelector('.card__image').src;
        popupImageFunction(cardTitle, cardImage);
    });
});



















// pop up function
const popUp = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button')
const profileFormElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('name-input');
const jobInput = document.getElementById('description-input');
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
}
function openProfilePopup() { 
    fillProfileForm();
    openPopup();
}
editButton.addEventListener('click', openProfilePopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('click', closePopup);


// Like button
const likeButtons = document.querySelectorAll('.card__like-button');
// Define the like function
function likeFunction(e) {
  // Get the specific button that was clicked
  const clickedButton = e.target;
  
  // Get the current background image
  const currentBackgroundImage = clickedButton.style.backgroundImage;

  // Toggle the background image based on the current state
  if (currentBackgroundImage.includes('Union.svg')) {
    clickedButton.style.backgroundImage = 'url(../images/heart.svg)';
  } else {
    clickedButton.style.backgroundImage = 'url(../images/Union.svg)';
  }
}
// Attach the event listener to each like button
likeButtons.forEach(button => {
  button.addEventListener('click', likeFunction);
});


// delete function
const deleteIcons = document.querySelectorAll('.delete__icon');
function deleteFunction(e) {
    const card = e.target.closest('.card');
    if (card) {
        card.remove();
    }
}
deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', deleteFunction);
});