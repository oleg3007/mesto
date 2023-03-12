import { openPopupImage } from './script.js'
export default class Card {
	constructor(name, link, config) {
		this._name = name;
		this._link = link;
		this._config = config;
	}
	_getTemplate() {
		const cardElement = document.querySelector(this._config.eventCard).content.querySelector(this._config.element).cloneNode(true);
		return cardElement;
	}
	generatorCard() {
		this._element = this._getTemplate();

		this._element.querySelector(this._config.elementTitle).textContent = this._name;
		this._element.querySelector(this._config.elementMaskGroup).src = this._link;
		this._hangingEvents();

		return this._element;
	}
	// Сердце
	_paintingOverHeart() {
		this._element.querySelector(this._config.elementGroup).classList.toggle(this._config.elementGroupColorBlack);
	}
	// Удаление карточки
	_deletingCard() { this._element.remove(); }

	// Навешивание событий
	_hangingEvents() {
		this._element.querySelector(this._config.elementGroup).addEventListener('click', () => this._paintingOverHeart());
		this._element.querySelector(this._config.elementTrash).addEventListener('click', () => this._deletingCard());
		this._element.querySelector(this._config.elementMaskGroup).addEventListener('click', () => openPopupImage(this._name, this._link));
	}
}
