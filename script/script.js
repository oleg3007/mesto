import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import Section from './Section.js';


const page = document.querySelector('.page');
const main = page.querySelector('.main');

const profile = main.querySelector('.profile');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup-profile');
const popupHieldName = popupProfile.querySelector('.popup__hield_enter_name');
const popupHieldAboutMe = popupProfile.querySelector('.popup__hield_enter_about-me');

const formPopupProfile = popupProfile.querySelector('.popup__form');

const popupItem = document.querySelector('.popup-item');
const popupItemTitle = popupItem.querySelector('.popup__hield_enter_title');
const popupItemLink = popupItem.querySelector('.popup__hield_enter_link');
const popupItemButton = document.querySelector('.popup-item__button');

const elementsContainer = main.querySelector('.elements');

const popupImage = document.querySelector('.popup-image');
const popupImageFoto = popupImage.querySelector('.popup-image__foto');
const popupImageSignature = popupImage.querySelector('.popup-image__signature');

const buttonCloseList = document.querySelectorAll('.cros-popup');

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

const validatorPopupItem = new FormValidator(popupItem, config);
validatorPopupItem.enableValidation();

const validatorPopupProfile = new FormValidator(popupProfile, config);
validatorPopupProfile.enableValidation();

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
	validatorPopupItem.displayErrorbutton();
});

profileEditButton.addEventListener('click', function () {
	popupHieldName.value = profileTitle.textContent;
	popupHieldAboutMe.value = profileText.textContent;
	activPopup(popupProfile);
	validatorPopupProfile.displayErrorbutton();
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

// Закрытие popup крестик
buttonCloseList.forEach(btn => {
	const popup = btn.closest('.popup');
	btn.addEventListener('click', () => removePopup(popup));
	closingWithTheMouse(popup);
})

formPopupProfile.addEventListener('submit', submitFormProfile);


// // Кнопка сохранение карточки
// popupItemButton.addEventListener('click', function (evt) {
// 	evt.preventDefault();
// const name = popupItemTitle.value;
// const link = popupItemLink.value;

// elementsContainer.prepend(createCard(name, link, configCard)
// );
// removePopup(popupItem);
// popupItemTitle.value = '';
// popupItemLink.value = '';
// })

const section = new Section({
	items: initialCards,
	renderer: (data, link) => {
		const card = new Card(data, link, configCard);
		const elementCard = card.generatorCard();
		section.addElement(elementCard);
	}
},
	elementsContainer);

section.addItem();



