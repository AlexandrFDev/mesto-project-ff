const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid
    })
}

export const enableValidation = (elements) => {

    const toggleButtonState = (inputList, buttonElement) => {
        if(hasInvalidInput(inputList)) {
            buttonElement.classList.add(elements.inactiveButtonClass)
        } else {
            buttonElement.classList.remove(elements.inactiveButtonClass)
        }
    }

    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(elements.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(elements.errorClass);
    }

    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(elements.inputErrorClass);
        errorElement.classList.remove(elements.errorClass);
        errorElement.textContent = '';
    }

    const checkInputValidity = (formElement, inputElement) => {

        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }

        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    }

    const setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(elements.inputSelector));
        const buttonElement = formElement.querySelector(elements.submitButtonSelector);

        toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        });
    }

    const formList = Array.from(document.querySelectorAll(elements.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);

    });

}

export const clearValidation = (profileForm, validationConfig) => {

    const errorList = Array.from(profileForm.querySelectorAll(`.${validationConfig.errorClass}`));
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.classList.remove(validationConfig.inputErrorClass);
    })
    errorList.forEach((errorElement) => {
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = '';
    })

    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass)
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    }

}