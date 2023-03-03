const page = document.querySelector('.page');
const main = page.querySelector('.main');
const popup = document.querySelector('.popup');

const profile = main.querySelector('.profile');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profile.querySelector('.profile__edit-button');

const popupButton = document.querySelector('.popup__button');
const popupProfile = document.querySelector('.popup-profile');
const popupCros = popupProfile.querySelector('.popup__cros');
const popupHieldName = popupProfile.querySelector('.popup__hield_enter_name');
const popupHieldAboutMe = popupProfile.querySelector('.popup__hield_enter_about-me');

const formElement = document.querySelector('.popup__conteiner');

const popupCrosItem = document.querySelector('.popup-item__cros');
const popupItem = document.querySelector('.popup-item');
const popupItemTitle = popupItem.querySelector('.popup__hield_enter_title');
const popupItemLink = popupItem.querySelector('.popup__hield_enter_link');
const popupItemButton = document.querySelector('.popup-item__button');

const elements = main.querySelector('.elements');

const eventCard = document.querySelector('#event-card').content.querySelector('.element');

const popupImage = document.querySelector('.popup-image');
const popupImageCros = popupImage.querySelector('.popup-image__cros');
const popupImageFoto = popupImage.querySelector('.popup-image__foto');
const popupImageSignature = popupImage.querySelector('.popup-image__signature');

// функция активации popup 
function activPopup(block) {
	block.classList.add('popup_active');
	document.addEventListener('keydown', deletePopupEscape);
}
// Закрытие popup кнопкой 'Escate'
function deletePopupEscape(evt) {
	if (evt.key === 'Escape') {
		const active = document.querySelector('.popup_active');
		removePopup(active);
	}
}
// Функциb закрытия popup
function removePopup(block) {
	block.classList.remove('popup_active');
	document.removeEventListener('keydown', deletePopupEscape);
}

profileAddButton.addEventListener('click', () => { 
	activPopup(popupItem); 
	lockButton(popupItem, config)
});

profileEditButton.addEventListener('click', function () {
	popupHieldName.value = profileTitle.textContent;
	popupHieldAboutMe.value = profileText.textContent;
	activPopup(popupProfile);
})

// Функция заполнения и закрыти popup-profile
function submitFormProfile(evt) {
	evt.preventDefault();
	profileTitle.textContent = popupHieldName.value;
	profileText.textContent = popupHieldAboutMe.value;
	removePopup(popupProfile);
}
// popup открытия картинки
function openPopupImage(titleElement, linkElement) {
	popupImageFoto.src = linkElement;
	popupImageFoto.alt = titleElement;
	popupImageSignature.textContent = titleElement;
	activPopup(popupImage);
}


// Закрытие popup левой кнопкой 'мыши'
function closingWithTheMouse(block) {
	block.addEventListener('click', (e) => {
		if (e.target === block) {
			removePopup(block)
		}
	})
};
closingWithTheMouse(popupProfile);
closingWithTheMouse(popupItem);
closingWithTheMouse(popupImage);

popupCros.addEventListener('click', () => removePopup(popupProfile));
popupCrosItem.addEventListener('click', () => removePopup(popupItem));
popupImageCros.addEventListener('click', () => removePopup(popupImage));


formElement.addEventListener('submit', submitFormProfile);


const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

// Заполнение контента карточками из шаблона 
initialCards.forEach((item) => {
	const card = new Card(item.name, item.link);
	const cardElement = card.generatorCard();

	document.querySelector('.elements').append(cardElement);
})

// Кнопка сохранение карточки
popupItemButton.addEventListener('click', function () {
	const name = popupItemTitle.value;
	const link = popupItemLink.value;

	const card = new Card(name, link)
	const cardElement = card.generatorCard();
	elements.prepend(cardElement);
	removePopup(popupItem);
	popupItemTitle.value = '';
	popupItemLink.value = '';
})

class Card {
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
	_deletingCard() {this._element.remove();}

	// Навешивание событий
	_hangingEvents() {
		this._element.querySelector('.element__group').addEventListener('click', () => this._paintingOverHeart());
		this._element.querySelector('.element__trash').addEventListener('click', () => this._deletingCard());
	}
}
