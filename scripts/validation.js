const toggleButtonState = (formElement, buttonElement) => {
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    
    // Check if any input is empty or doesn't meet validity criteria
    const hasInvalidInput = inputs.some(input => input.value.trim() === '' || !input.validity.valid);
    
    if (hasInvalidInput) {
        buttonElement.classList.add('popup__submit_inactive');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__submit_inactive');
        buttonElement.disabled = false;
    }
};

const showError = (input, errorMessage) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
};

const hideError = (input) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
};

const checkInputValidity = (input) => {
    if (!input.validity.valid) {
        showError(input, input.validationMessage);
    } else {
        hideError(input);
    }
};

const setEventListeners = (formElement) => {
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit');
    
    // Ensure the initial state is set based on the form content
    toggleButtonState(formElement, buttonElement);

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input);
            toggleButtonState(formElement, buttonElement);
        });
    });

    formElement.addEventListener('reset', () => {
        inputs.forEach((input) => {
            hideError(input);
            toggleButtonState(formElement, buttonElement);
        });
    });
};

const enableValidation = () => {
    const forms = Array.from(document.querySelectorAll('.popup__form'));
    
    forms.forEach((form) => {
        setEventListeners(form);
        // Ensure button state is correct when the modal is opened
        const buttonElement = form.querySelector('.popup__submit');
        toggleButtonState(form, buttonElement);
    });
};

// Call this function to enable validation on page load
enableValidation();

// Close modal on background click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
});

// Close modal on escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openPopup = document.querySelector('.popup_opened');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
});
