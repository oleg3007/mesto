import Card from './Card.js';
import FormValidator from './validate.js';
import { initialCards } from './initialCards.js';


const page = document.querySelector('.page');
const main = page.querySelector('.main');

const profile = main.querySelector('.profile');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profile.querySelector('.profile__edit-button');

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

const popupImage = document.querySelector('.popup-image');
const popupImageCros = popupImage.querySelector('.popup-image__cros');
const popupImageFoto = popupImage.querySelector('.popup-image__foto');
const popupImageSignature = popupImage.querySelector('.popup-image__signature');

const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__hield',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__hield_type_error',
	errorClass: 'popup__error_visible',
	spanClassTypeField: '.popup__form-input-error_field_'
}
const configCard = {
	eventCard: '.event-card',
	element: '.element',
	elementTitle: '.element__title',
	elementMaskGroup: '.element__mask-group',
	elementGroup: '.element__group',
	elementGroupColorBlack: 'element__group_color_black',
	elementTrash: '.element__trash',
}

// функция активации popup 
function activPopup(block) {
	block.classList.add('popup_active');
	document.addEventListener('keydown', deletePopupEscape);
	const formValidator = new FormValidator(block, config);
	formValidator.createTodo();
	formValidator.lockButton();
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
export function openPopupImage(titleElement, linkElement) {
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

// Заполнение контента карточками из шаблона 
initialCards.forEach((item) => {
	const card = new Card(item.name, item.link, configCard);
	const cardElement = card.generatorCard();
	elements.append(cardElement);
})
// Кнопка сохранение карточки
popupItemButton.addEventListener('click', function (evt) {
	evt.preventDefault();
	const name = popupItemTitle.value;
	const link = popupItemLink.value;

	const card = new Card(name, link, configCard);
	const cardElement = card.generatorCard();
	elements.prepend(cardElement);
	removePopup(popupItem);
	popupItemTitle.value = '';
	popupItemLink.value = '';
})

