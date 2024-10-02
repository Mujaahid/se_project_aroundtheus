export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    
        console.log('Input elements found:', this._inputList);  // Debug log
        console.log('Submit button found:', this._submitButton);  // Debug log
    }
    

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
            console.log('Invalid input detected:', inputElement.id); 
        } else {
            this._hideError(inputElement);
            console.log('Valid input:', inputElement.id);
        }
        console.log(inputElement.validity, "this one");

    }
    

    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass); 
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass); 
        errorElement.textContent = "";
    }

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

    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement);
        });
        this._toggleButtonState();
    }
}

