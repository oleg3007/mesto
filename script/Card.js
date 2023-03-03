import { openPopupImage } from './script.js'

export default class Card {
	constructor(name, link) {
		this._name = name;
		this._link = link;
	}
	_getTemplate() {
		const cardElement = document.querySelector('.event-card').content.querySelector('.element').cloneNode(true);
		return cardElement;
	}
	generatorCard() {
		this._element = this._getTemplate();

		this._element.querySelector('.element__title').textContent = this._name;
		this._element.querySelector('.element__mask-group').src = this._link;
		this._hangingEvents();

		return this._element;
	}
	// Сердце
	_paintingOverHeart() {
		this._element.querySelector('.element__group').classList.toggle('element__group_color_black');
	}
	// Удаление карточки
	_deletingCard() { this._element.remove(); }

	// Навешивание событий
	_hangingEvents() {
		this._element.querySelector('.element__group').addEventListener('click', () => this._paintingOverHeart());
		this._element.querySelector('.element__trash').addEventListener('click', () => this._deletingCard());
		this._element.querySelector('.element__mask-group').addEventListener('click', () => openPopupImage(this._name, this._link));
	}
}
