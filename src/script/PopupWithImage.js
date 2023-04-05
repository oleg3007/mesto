import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(data) {
		super(data);
		this._popupImageFoto = this._selectorPopup.querySelector('.popup-image__foto');
		this._popupImageSignature = this._selectorPopup.querySelector('.popup-image__signature');
	}
	open(name, link) {
		this._popupImageFoto.src = link;
		this._popupImageSignature.alt = name;
		this._popupImageSignature.textContent = name;
		super.open();
	}
}