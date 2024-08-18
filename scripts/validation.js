const toggleButtonState = (formElement, buttonElement, options) => {
    const inputs = Array.from(formElement.querySelectorAll(options.inputSelector));
    
    // Check if any input is empty or invalid
    const hasInvalidInput = inputs.some(input => input.value.trim() === '' || !input.validity.valid);
    
    if (hasInvalidInput) {
        buttonElement.classList.add(options.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(options.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const showError = (input, errorMessage, options) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
};

const hideError = (input, options) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (input, options) => {
    if (!input.validity.valid) {
        showError(input, input.validationMessage, options);
    } else {
        hideError(input, options);
    }
};

const setEventListeners = (formElement, options) => {
    const inputs = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);

    // Ensure initial state is set based on the form content
    toggleButtonState(formElement, buttonElement, options);

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, options);
            toggleButtonState(formElement, buttonElement, options);
        });
    });

    formElement.addEventListener('reset', () => {
        inputs.forEach((input) => {
            hideError(input, options);
            toggleButtonState(formElement, buttonElement, options);
        });
    });
};


const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    
    forms.forEach((form) => {
        setEventListeners(form, options);
    });
};

// Call this function to enable validation on page load
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__button_disabled", 
    inputErrorClass: "popup__input_type_error",      
    errorClass: "popup__input-error_active",   
});
