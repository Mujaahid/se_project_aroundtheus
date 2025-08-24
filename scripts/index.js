import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";


const validationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",  // Make sure this matches your button class
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

// Array of cards and titles
const initialCards = [
    { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
    { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
    { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
    { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
];

// PopupSelectors.js
export const popupSelectors = {
    popups: document.querySelectorAll('.popup'),
    addPopup: document.getElementById('add-popup'),
    addCardButton: document.querySelector('.profile__add-button'),
    submitAddCardForm: document.getElementById('add-form'),
    cardsList: document.getElementById('cardList'), // This is where cardsList is defined
    addCardTitleInput: document.getElementById('add_title-input'),
    addCardImageInput: document.getElementById('add_url-input'),
    profilePopup: document.getElementById('edit-popup'),
    editButton: document.querySelector('.profile__edit-button'),
    profileFormElement: document.getElementById('edit-profile-form'),
    nameInput: document.getElementById('name-input'),
    jobInput: document.getElementById('description-input'),
    profileName: document.querySelector('.profile__title'),
    profileJob: document.querySelector('.profile__description'),
    picturePopup: document.getElementById('image_preview'),
    popupImage: document.querySelector('.popup__image'),
    popupTitle: document.querySelector('.popup__image-title'),
    closeButtons: document.querySelectorAll('.popup__close-button'),
};

// Define cardsList
const cardsList = document.getElementById('cardList'); // Add this line

// User Info instance
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__description'
});

// Popup instances
const profilePopup = new PopupWithForm('#edit-popup', (formData) => {
    userInfo.setUserInfo(formData);
    profilePopup.close();
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('#add-popup', (formData) => {
    const card = new Card(formData, "#card-template", handleCardClick);
    cardsList.prepend(card.getView());
    addCardPopup.close();
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage('#image_preview');
imagePopup.setEventListeners();

// Handle card click
function handleCardClick(cardData) {
    imagePopup.open(cardData);
}

// Render initial cards
initialCards.forEach(cardData => {
    const card = new Card(cardData, '#card-template', handleCardClick);
    cardsList.prepend(card.getView()); // Now cardsList is defined
});




// Event listeners
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    document.querySelector('#name-input').value = userData.name;
    document.querySelector('#description-input').value = userData.job;
    profilePopup.open();
});

document.querySelector('.profile__add-button').addEventListener('click', () => addCardPopup.open());

// Form validation
new FormValidator(validationSettings, document.querySelector('#edit-profile-form')).enableValidation();
new FormValidator(validationSettings, document.querySelector('#add-form')).enableValidation();
