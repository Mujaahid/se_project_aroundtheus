import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';

// Array of cards and titles
const initialCards = [
    { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
    { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
    { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
    { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
];

const popups = document.querySelectorAll('.popup'); // Selects all elements with the 'popup' class
const addPopup = document.getElementById('add-popup');
const addCardButton = document.querySelector('.profile__add-button');
const submitAddCardForm = document.getElementById('add-form');
const cardsList = document.getElementById('cardList');
const addCardTitleInput = document.getElementById('add_title-input');
const addCardImageInput = document.getElementById('add_url-input');
const profilePopup = document.getElementById('edit-popup');
const editButton = document.querySelector('.profile__edit-button');
const profileFormElement = document.getElementById('edit-profile-form');
const nameInput = document.getElementById('name-input');
const jobInput = document.getElementById('description-input');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const picturePopup = document.getElementById('image_preview');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title');
const closeButtons = document.querySelectorAll('.popup__close-button');

// Function to handle the Escape key press
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// Function to open a popup and add the Escape key event listener
function openPopup(popup) {
    if (popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', handleEscClose); // Add listener when opening
    }
}

// Function to close a popup and remove the Escape key event listener
function closePopup(popup) {
    if (popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', handleEscClose); // Remove listener when closing
    }
}

// Attach event listeners to buttons for opening and closing popups
addCardButton.addEventListener('click', () => openPopup(addPopup));

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const popup = e.target.closest('.popup');
        closePopup(popup);
    });
});

// Function to handle background clicks directly on the popup
function handleBackgroundClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

// Attach event listener for background click directly to each popup
popups.forEach(popup => {
    popup.addEventListener('click', handleBackgroundClick);
});

// Function to create a card
function createCard(cardData) {
    const card = new Card(cardData, '#card-template', showPopupImage); // Add the third parameter
    return card.getView();
}

// Function to render a card by appending it to the list
function renderCard(cardData) {
    const cardElement = createCard(cardData);
    cardsList.prepend(cardElement);
}

// Render initial cards using the Card class
initialCards.forEach(cardData => {
    renderCard(cardData);
});

// Handle form submission for adding a new card
submitAddCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = addCardTitleInput.value;
    const imageUrl = addCardImageInput.value;
    if (title && imageUrl) {
        renderCard({ name: title, link: imageUrl });
        addCardTitleInput.value = '';
        addCardImageInput.value = '';
        closePopup(addPopup);
    }
});

// Show a larger version of the image in a popup
function showPopupImage(title, imageUrl) {
    popupImage.src = imageUrl;
    popupImage.alt = title; 
    popupTitle.textContent = title;
    openPopup(picturePopup);
}

// Handle profile form submission
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Fill profile form with existing data
function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Open profile popup with pre-filled form
function openProfilePopup() {
    fillProfileForm();
    openPopup(profilePopup);
}

editButton.addEventListener('click', openProfilePopup);

document.addEventListener('DOMContentLoaded', () => {
    const settings = {
        inputSelector: '.popup__input',               // Matches input class in HTML
        submitButtonSelector: '.popup__submit',       // Update this to match your submit button class
        inactiveButtonClass: 'popup__button_disabled', // Add this class in your CSS if you want to disable the button
        inputErrorClass: 'popup__input_type_error',    // For input field errors (adjust if different in CSS)
        errorClass: 'popup__input-error'              // Matches the error message class in your HTML
    };
    
    // Reuse already selected forms
    const editProfileFormElement = document.querySelector('#edit-profile-form');
    const addFormElement = document.querySelector('#add-form');

    if (editProfileFormElement) {
        const editProfileValidator = new FormValidator(settings, editProfileFormElement);
        editProfileValidator.enableValidation();
    }

    if (addFormElement) {
        const addFormValidator = new FormValidator(settings, addFormElement);
        addFormValidator.enableValidation();
    }
});
