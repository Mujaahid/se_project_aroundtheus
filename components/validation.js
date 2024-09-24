export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    // Private method to check input validity
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }

    // Private method to show an error message
    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    // Private method to hide an error message
    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    }

    // Private method to toggle submit button state based on form validity
    _toggleButtonState() {
        const isFormInvalid = this._inputList.some(inputElement => !inputElement.validity.valid);
        if (isFormInvalid) {
            this._submitButton.classList.add(this._settings.inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._settings.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    // Private method to set event listeners for form elements
    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        this._formElement.addEventListener('reset', () => {
            this._inputList.forEach(inputElement => {
                this._hideError(inputElement);
            });
            this._toggleButtonState();
        });
    }

    // Public method to enable validation
    enableValidation() {
        this._setEventListeners();
    }

    // Public method to reset validation (e.g., when form is submitted or modal is closed)
    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement);
        });
        this._toggleButtonState();
    }
}
