// отоброжение ошибки
const showInputError = (input, errorElement, inputErrorClass) => {
	input.classList.add(inputErrorClass);
	errorElement.textContent = input.validationMessage;
}
// Скрытие ошибки
const fandInputError = (input, errorElement, inputErrorClass) => {
	input.classList.remove(inputErrorClass);
	errorElement.textContent = "";
}
// Опредиление валиндости поля
const determiningValidityInput = (input, errorElement, inputErrorClass) => {
	if (input.validity.valid) {
		fandInputError(input, errorElement, inputErrorClass);
	} else {
		showInputError(input, errorElement, inputErrorClass);
	}
};



// Включение кнопки
const enabledButton = (buttons, inactiveButtonClass) =>{
	buttons.classList.remove(inactiveButtonClass);
	buttons.disabled = false;
}
// Отключение кнопки
const powerOffButton = (button, inactiveButtonClass) => {
	button.classList.add(inactiveButtonClass);
	button.disabled = true;
}
// Проверка на валидность для кнопки
const toggleButtonState = (button, inactiveButtonClass, buttonState) =>{
	if (buttonState) {
		powerOffButton(button, inactiveButtonClass);
	} else {
		enabledButton(button, inactiveButtonClass);
	}
}

const hasInvanLidInput = (inputs) => {
	return inputs.some((input) => !input.validity.valid)
}

const handleFormInput = (evt, form, inputErrorClass, inputs, buttons, inactiveButtonClass) => {
	const input = evt.target;
	const errorElement = form.querySelector(`.popup__form-input-error_field_${input.name}`);
	determiningValidityInput(input, errorElement, inputErrorClass);
	const buttonState = hasInvanLidInput (inputs);
	buttons.forEach((button) => {
		button.addEventListener('submit', toggleButtonState(button, inactiveButtonClass, buttonState))
	}) 
}

const handleFormSubmit = (evt) => {
	evt.preventDefault();
}

const enableValidation = ({ 
	formSelector, 
	inputSelector, 
	inputErrorClass, 
	submitButtonSelector,
	inactiveButtonClass
}) => {
	const forms = Array.from(document.querySelectorAll(formSelector));
		forms.forEach((form) => {
			form.addEventListener('submit', handleFormSubmit);
			const buttons = Array.from(form.querySelectorAll(submitButtonSelector));
			const inputs = Array.from(form.querySelectorAll(inputSelector))
			inputs.forEach((inputElement) => {
				inputElement.addEventListener('input', (evt) => handleFormInput(
					evt, 
					form, 
					inputErrorClass,
					inputs, 
					buttons, 
					inactiveButtonClass
					));
			})
		})
	};

enableValidation ({
	formSelector: '.popup__form',
	inputSelector: '.popup__hield',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__hield_type_error',
	errorClass: 'popup__error_visible'
}); 