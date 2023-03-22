export default class Popup {
	constructor(selectorPopup) {
		this._selectorPopup = selectorPopup;
	}
	open() {
		this._selectorPopup.classList.add('popup_active');
		document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
	}
	close() {
		this._selectorPopup.classList.remove('popup_active');
		document.removeEventListener('keydown', this._handleEscClose);
	}
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
	setEventListeners() {
		this._selectorPopup.addEventListener('click', (evt) => {
			this.close();
			if (evt.target === this._selectorPopup) {
				this.close();
			}
		});
	}
}
