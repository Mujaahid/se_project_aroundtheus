export default class Card {
    constructor({ name, link }, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        // Like button toggle
        this._cardElement.querySelector(".card__like-button").addEventListener('click', () => {
            this._handleLikeIcon();
        });
        // Delete button functionality
        this._cardElement.querySelector('.delete__icon').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        // Image click functionality for popup
        this._cardElement.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link); // Trigger the popup when clicked
        });
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _handleLikeIcon() {
        this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
    }

    getView() {
        // Create the card DOM element from the template
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        
        // Set the image and title
        this._cardElement.querySelector('.card__image').src = this._link;
        this._cardElement.querySelector('.card__image').alt = this._name;
        this._cardElement.querySelector('.card__title').textContent = this._name;
        
        // Attach event listeners
        this._setEventListeners();
        
        // Return the complete card element for use in the main script
        return this._cardElement;
    }
}
