import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(selectorPopup, colbeckFunction) {
		super(selectorPopup);
		this._colbeckFunction = colbeckFunction;
		this._submitButtonSelector = this._selectorPopup.querySelector('.popup__button')
		this._popupForm = this._selectorPopup.querySelector('.popup__form');
		this._popupInput = this._selectorPopup.querySelectorAll('.popup__hield');
	}
	_getInputValues() {
		const formInputs = {};
		this._popupInput.forEach((input) => {
			formInputs[input.name] = input.value;
		});
		return formInputs;
	}
	setEventListeners() {
		super.setEventListeners();
		this._popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._colbeckFunction(this._getInputValues())
			this.close();
		});
	}
	close() {
		super.close();
		this._popupForm.reset();
	}
}