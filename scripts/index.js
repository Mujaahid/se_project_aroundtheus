// Array of cards and titles
const initialCards = [
    { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
    { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
    { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
    { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
];
const cardTemplate = document.getElementById('card-template').content;
const addPopup = document.querySelector('.add-popup');
const addCardButton = document.querySelector('.profile__add-button');
const submitAddCard = document.querySelector('.add__popup-submit');
const cardsList = document.querySelector('.cards__list');
const addCardTitleInput = document.getElementById('add__popup--name');
const addCardImageInput = document.getElementById('add__popup--url');
const profilePopup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const profileFormElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('name-input');
const jobInput = document.getElementById('description-input');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const picturePopup = document.querySelector('.picture-popup');
const popupImage = document.querySelector('.picture__popup-image');
const popupTitle = document.querySelector('.picture__popup-title');
const closeButtons = document.querySelectorAll('.popup__close-button');

function openPopup(popup) {
    if (popup) {
        popup.classList.add('popup_opened');
    }
}

function closePopup(popup) {
    if (popup) {
        popup.classList.remove('popup_opened');
    } 
}

addCardButton.addEventListener('click', () => openPopup(addPopup));

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const popup = e.target.closest('.popup');
        closePopup(popup);
    });
});

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.delete__icon');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', () => {
        showPopupImage(cardData.name, cardData.link);
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_active');
    });

    deleteButton.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card) {
            card.remove();
        }
    });

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
        const newCard = createCard({ name: title, link: imageUrl });
        cardsList.prepend(newCard);
        addCardTitleInput.value = '';
        addCardImageInput.value = '';
        closePopup(addPopup);
    }
});

function showPopupImage(title, imageUrl) {
    popupImage.src = imageUrl;
    popupImage.alt = title; 
    popupTitle.textContent = title;
    openPopup(picturePopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openProfilePopup() {
    fillProfileForm();
    openPopup(profilePopup);
}

editButton.addEventListener('click', openProfilePopup);