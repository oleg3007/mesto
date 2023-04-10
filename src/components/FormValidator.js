class FormValidator {
	constructor(block, config) {
		this._form = block.querySelector(config.formSelector);
		this._config = config;
	}
	enableValidation() {
		this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
		this._button = this._form.querySelector(this._config.submitButtonSelector);

		this._inputs.forEach((input) => {
			input.addEventListener('input', () => {
				const errorElement = this._form.querySelector(`${this._config.spanClassTypeField}${input.name}`)
				this._determiningValidityInput(input, errorElement);
				this._toggleButtonState();
			})
		});
	}

	// Условие при валидации input
	_displayErrorField(input, errorElement) {
		input.classList.remove(this._config.inputErrorClass);
		errorElement.textContent = "";
	}
	_removingErrorField(input, errorElement) {
		input.classList.add(this._config.inputErrorClass);
		errorElement.textContent = input.validationMessage;
	}
	_determiningValidityInput(input, errorElement) {
		if (input.validity.valid) {
			this._displayErrorField(input, errorElement);
		} else {
			this._removingErrorField(input, errorElement)
		}
	}

	// Условие при валидации button
	_hasInvanLidInput() {
		return this._inputs.some((input) => !input.validity.valid)
	}
	disableButton() {
		this._button.classList.add(this._config.inactiveButtonClass);
		this._button.disabled = true;
	}
	_enableButton() {
		this._button.classList.remove(this._config.inactiveButtonClass);
		this._button.disabled = false;
	}
	_toggleButtonState() {
		if (this._hasInvanLidInput()) {
			this.disableButton();
		} else {
			this._enableButton();
		}
	}
}

export default FormValidator;
