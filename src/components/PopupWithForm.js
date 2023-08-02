import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(selectorPopup, colbeckFunction) {
		super(selectorPopup);
		this._colbeckFunction = colbeckFunction;
		this._popupForm = this._popup.querySelector('.popup__form');
		this._popupInputs = this._popup.querySelectorAll('.popup__hield');
		this._submitBtn = this._popup.querySelector('.popup__button');
		this._defaultBtnText = this._submitBtn.textContent;
		// this._submitBtnText = this._submitBtn.textContent
	}
	// renderLoading(isLoading, loadingText='Сохранение...') {
	// 	if (isLoading) {
	// 	  this._submitBtn.textContent = loadingText;
	// 	} else {
	// 	  this._submitBtn.textContent = this._submitBtnText;
	// 	}
	//   }
	_getInputValues() {
		const formInputs = {};
		this._popupInputs.forEach((input) => {
			formInputs[input.name] = input.value;
		});
		return formInputs;
	}
	setDefaultText(){
		this._submitBtn.textContent = this._defaultBtnText
	  }
	setEventListeners() {
		super.setEventListeners();
		this._popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitBtn.textContent = 'Сохранение...';
			this._colbeckFunction(this._getInputValues())
		});
	}
	close() {
		super.close();
		this._popupForm.reset();
	}
}