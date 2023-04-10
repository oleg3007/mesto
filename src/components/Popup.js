export default class Popup {
	constructor(popup) {
		this._popup = popup;
		this._popupCros = this._popup.querySelector('.cros-popup');
		this._handleEscClose = this._handleEscClose.bind(this);
	}
	open() {
		this._popup.classList.add('popup_active');
		document.addEventListener('keydown', this._handleEscClose);
	}
	close() {
		this._popup.classList.remove('popup_active');
		document.removeEventListener('keydown', this._handleEscClose);
	}
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
	setEventListeners() {
		this._popup.addEventListener('click', (evt) => {
			if (evt.target === this._popup) {
				this.close();
			}
		});
		this._popupCros.addEventListener('click', () => {
			this.close();
		})
	}
}
