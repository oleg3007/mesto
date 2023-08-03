export default class Card {
	constructor(data, userId, config, openPopupImage, functionDelete, functionLikeCards) {
		this._data = data;
		this._config = config;
		this._functionDelete = functionDelete;
		this._openPopupImage = openPopupImage;
		this._myId = userId;
		this._functionLikeCards = functionLikeCards;
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

		this._element.querySelector(this._config.elementTitle).textContent = this._data.name;
		this._elementMaskGroup.alt = this._data.name;
		this._elementMaskGroup.src = this._data.link;
		this._elementNanbersLike.textContent = this._data.likes.length;
		
		this._likes()
		this._hangingEvents();
		this._deletingOnTheCartCard();
		return this._element;
	}

	_likes() {
		this._data.likes.forEach((like) => {
			if (like._id === this._myId) {
				this._elementGroup.classList.toggle(this._config.elementGroupColorBlack);
			}
		})
	}
	// Проверка на свою карточку
	_deletingOnTheCartCard() {
		if (this._myId !== this._data.owner._id) {
			this._element.querySelector(this._config.elementTrash).remove();
		}
	}
	// Сердце
	paintingOverHeart(lieks) {
		this._elementGroup.classList.toggle(this._config.elementGroupColorBlack);
		this._elementNanbersLike.textContent = lieks.length;
	}
	// Удаление карточки
	deletIngCard() { 
		this._element.remove(); 
		this._element = null; 
	}
	
	buttenLike() {
		return this._elementGroup.classList.contains(this._config.elementGroupColorBlack)

	}
	// Навешивание событий
	_hangingEvents() {
		this._elementGroup.addEventListener('click', () => this._functionLikeCards(this, this._data._id));
		this._element.querySelector(this._config.elementTrash).addEventListener('click', () => this._functionDelete({ card: this, cardId: this._data._id }));
		this._elementMaskGroup.addEventListener('click', () => this._openPopupImage(this._data.name, this._data.link));
	}
}
