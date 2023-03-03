export const lockButton = (block, config) => {
	const button = block.querySelector(config.submitButtonSelector);
	button.classList.add(config.inactiveButtonClass);
	button.disabled = true;
}

// отоброжение ошибки
const showInputError = (input, errorElement, config) => {
	input.classList.add(config.inputErrorClass);
	errorElement.textContent = input.validationMessage;
}
// Скрытие ошибки
const fandInputError = (input, errorElement, config) => {
	input.classList.remove(config.inputErrorClass);
	errorElement.textContent = "";
}
// Опредиление валиндости поля
const determiningValidityInput = (input, errorElement, config) => {
	if (input.validity.valid) {
		fandInputError(input, errorElement, config);
	} else {
		showInputError(input, errorElement, config);
	}
};

// Включение кнопки
const enabledButton = (buttons, config) => {
	buttons.classList.remove(config.inactiveButtonClass);
	buttons.disabled = false;
}
// Отключение кнопки
const powerOffButton = (button, config) => {
	button.classList.add(config.inactiveButtonClass);
	button.disabled = true;
}
// Проверка на валидность для кнопки
const toggleButtonState = (button, config, buttonState) =>{
	if (buttonState) {
		powerOffButton(button, config);
	} else {
		enabledButton(button, config);
	}
}

const hasInvanLidInput = (inputs) => {
	return inputs.some((input) => !input.validity.valid)
}

const handleFormInput = (inputElement, form, inputs, buttons, spanClassTypeField, config) => {
	const errorElement = form.querySelector(`${spanClassTypeField}${inputElement.name}`);
	determiningValidityInput(inputElement, errorElement, config);
	const buttonState = hasInvanLidInput (inputs);
	buttons.forEach((button) => {
		button.addEventListener('submit', toggleButtonState(button, config, buttonState));
	})
}

const handleFormSubmit = (evt) => {
	evt.preventDefault();
}

const enableValidation = (config) => {
	const forms = Array.from(document.querySelectorAll(config.formSelector));
	forms.forEach((form) => {
		form.addEventListener('submit', handleFormSubmit);
		const buttons = Array.from(form.querySelectorAll(config.submitButtonSelector));
		const inputs = Array.from(form.querySelectorAll(config.inputSelector))
		inputs.forEach((inputElement) => {
			inputElement.addEventListener('input', (evt) => handleFormInput(
				inputElement, 
				form, 
				inputs, 
				buttons,
				config.spanClassTypeField, 
				config
			));
		})
	})
};
export const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__hield',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__hield_type_error',
	errorClass: 'popup__error_visible',
	spanClassTypeField: '.popup__form-input-error_field_'
}
enableValidation(config);
