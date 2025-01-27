import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popup.querySelector('.popup__image');
        this._titleElement = this._popup.querySelector('.popup__image-title');
    }

    // Open popup and set image details
    open({ name, link }) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._titleElement.textContent = name;
        super.open();
    }
}
