import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(selectorPopup, colbeckFunction) {
		super(selectorPopup);
		this._colbeckFunction = colbeckFunction;
		this._popupForm = this._popup.querySelector('.popup__form');
		this._popupInputs = this._popup.querySelectorAll('.popup__hield');
	}
	open() {
		super.open();
	}
	_getInputValues() {
		const formInputs = {};
		this._popupInputs.forEach((input) => {
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