// Array of cards and titles
const initialCards = [
    { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
    { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
    { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
    { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
];

// add card modual
const cardList = document.getElementById('cardList');
const cardTemplate = document.getElementById('card-template').content;
const addPopup = document.querySelector('.add__popup');
const addCardButton = document.querySelector('.profile__add-button');
const closeAddCardButton = document.querySelector('.add__popup--close-button');
function openAddPopup() {
    addPopup.classList.add('popup_opened');
}
function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
}
addCardButton.addEventListener('click', openAddPopup);
closeAddCardButton.addEventListener('click', closeAddPopup);

// 
const submitAddCard = document.querySelector('.add__popup-submit');
const cardsList = document.querySelector('.cards__list');
const addCardTitleInput = document.getElementById('add__popup--name');
const addCardImageInput = document.getElementById('add__popup--url');
function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardData.name;
    return cardElement;
}
function createNewCard(title, imageUrl) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = title;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = imageUrl;
    cardImage.alt = title;
    return cardElement;
}
initialCards.forEach(cardData => {
    const card = createCard(cardData);
    cardsList.appendChild(card);
});
submitAddCard.addEventListener('click', (e) => {
    e.preventDefault();
    const title = addCardTitleInput.value;
    const imageUrl = addCardImageInput.value;
    if (title && imageUrl) {
        const newCard = createNewCard(title, imageUrl);
        cardsList.prepend(newCard);
        addCardTitleInput.value = '';
        addCardImageInput.value = '';
        closeAddPopup();
    }
});


//  Image popup modual
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
cardsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__image')) {
        const cardElement = e.target.closest('.card');
        const cardTitle = cardElement.querySelector('.card__title').textContent;
        const cardImage = e.target.src;
        popupImageFunction(cardTitle, cardImage);
    }
});


// Edit porfile
const profilePopup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const profileFormElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('name-input');
const jobInput = document.getElementById('description-input');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
function openPopup() {
    profilePopup.classList.add('popup_opened');
}
function closePopup() {
    profilePopup.classList.remove('popup_opened');
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


// delete function and like function
const cardsContainer = document.querySelector('.cards__list');
cardsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('card__like-button')) {
        const clickedButton = e.target;
        const currentBackgroundImage = clickedButton.style.backgroundImage;
        if (currentBackgroundImage.includes('Union.svg')) {
            clickedButton.style.backgroundImage = 'url(../images/heart.svg)';
        } else {
            clickedButton.style.backgroundImage = 'url(../images/Union.svg)';
        }
    }
    if (e.target.classList.contains('delete__icon')) {
        const card = e.target.closest('.card');
        if (card) {
            card.remove();
        }
    }
});
