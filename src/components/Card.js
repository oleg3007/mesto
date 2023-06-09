export default class Card {
	constructor(placeName, link, likes, config, openPopupImage) {
		this._name = placeName;
		this._link = link;
		this._likes = likes
		this._config = config;
		this._openPopupImage = openPopupImage;
	}
	_getTemplate() {
		const cardElement = document.querySelector(this._config.eventCard).content.querySelector(this._config.element).cloneNode(true);
		return cardElement;
	}
	generatorCard() {
		this._element = this._getTemplate();
		this._elementGroup = this._element.querySelector(this._config.elementGroup);
		this._elementMaskGroup = this._element.querySelector(this._config.elementMaskGroup);
		this._elementNanbersLike = this._element.querySelector(this._config.elementNanbersLike);

		this._element.querySelector(this._config.elementTitle).textContent = this._name;
		this._elementMaskGroup.src = this._link;
		this._elementNanbersLike.textContent = this._likes;

		this._hangingEvents();

		return this._element;
	}
	// Сердце
	_paintingOverHeart() {
		this._elementGroup.classList.toggle(this._config.elementGroupColorBlack);
	}
	// Удаление карточки
	_deletingCard() { this._element.remove(); }

	// Навешивание событий
	_hangingEvents() {
		this._elementGroup.addEventListener('click', () => {
			this._paintingOverHeart();
			if (this._elementGroup.classList.contains(this._config.elementGroupColorBlack)) {
				this._elementNanbersLike.textContent++;
			} else {
				this._elementNanbersLike.textContent--;
			}

		});
		this._element.querySelector(this._config.elementTrash).addEventListener('click', () => this._deletingCard());
		this._elementMaskGroup.addEventListener('click', () => this._openPopupImage(this._name, this._link));
	}
}
