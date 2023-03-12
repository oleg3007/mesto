class FormValidator {
	constructor(form, config) {
		this._form = form;
		this._config = config;
	}
	createTodo() {
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
	lockButton() {
		this._button.classList.add(this._config.inactiveButtonClass);
		this._button.disabled = true;
	}
	// Изменения при валидации input
	_determiningValidityInput(input, errorElement) {
		if (input.validity.valid) {
			input.classList.remove(this._config.inputErrorClass);
			errorElement.textContent = "";
		} else {
			input.classList.add(this._config.inputErrorClass);
			errorElement.textContent = input.validationMessage;
		}
	}

	_hasInvanLidInput() {
		return this._inputs.some((input) => !input.validity.valid)
	}
	// Изменения при валидации button
	_toggleButtonState() {
		if (this._hasInvanLidInput()) {
			this._button.classList.add(this._config.inactiveButtonClass);
			this._button.disabled = true;
		} else {
			this._button.classList.remove(this._config.inactiveButtonClass);
			this._button.disabled = false;
		}
	}
}

export default FormValidator;
