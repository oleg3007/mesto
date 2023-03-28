import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


const page = document.querySelector('.page');
const main = page.querySelector('.main');

const profile = main.querySelector('.profile');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup-profile');
const popupHieldName = popupProfile.querySelector('.popup__hield_enter_name');
const popupHieldAboutMe = popupProfile.querySelector('.popup__hield_enter_about');

const popupItem = document.querySelector('.popup-item');
const popupItemTitle = popupItem.querySelector('.popup__hield_enter_title');
const popupItemLink = popupItem.querySelector('.popup__hield_enter_link');

const elementsContainer = main.querySelector('.elements');

const popupImage = document.querySelector('.popup-image');

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

const popupWithImage = new PopupWithImage(popupImage);

// функция активации popup 
function activPopup(block) {
	const popup = new Popup(block);
	popup.open();
}

// Функциb закрытия popup
function removePopup(block) {
	const popup = new Popup(block);
	popup.close();
}
// popup добовлений карточки
profileAddButton.addEventListener('click', () => {
	activPopup(popupItem);
	validatorPopupItem.displayErrorbutton();
});
// popup заполнения профиля
profileEditButton.addEventListener('click', function () {
	popupHieldName.value = profileTitle.textContent;
	popupHieldAboutMe.value = profileText.textContent;
	activPopup(popupProfile);
	validatorPopupProfile.displayErrorbutton();
})

// popup открытия картинки
export function openPopupImage(titleElement, linkElement) {
	popupWithImage.open(titleElement, linkElement);
	activPopup(popupImage);
}

// Закрытие popup крестик
buttonCloseList.forEach(btn => {
	const popupButton = btn.closest('.popup');
	btn.addEventListener('click', () => {
		removePopup(popupButton);
	})
})

// Функция заполнения и закрыти popup-profile
const popupWithFormProfile = new PopupWithForm(
	popupProfile,
	function submitFormProfile({ name, about }) {
		profileTitle.textContent = name;
		profileText.textContent = about;
	}
)
popupWithFormProfile.setEventListeners();

const popupWithFormItem = new PopupWithForm(
	popupItem,
	function submitFormCard({ name, link }) {
		popupItemTitle.value = name;
		popupItemLink.value = link;
		section.addItem(createCard(popupItemTitle.value, popupItemLink.value))
	}
)
popupWithFormItem.setEventListeners();

// Функция создаеия разметки карточки
function createCard(nameCard, linkCard) {
	const card = new Card(nameCard, linkCard, configCard);
	const elementCard = card.generatorCard();
	return elementCard;
}

// Контик заполнения и размещение карточки
const section = new Section({
	items: initialCards,
	renderer: (data, link) => {
		section.addItem(createCard(data, link));
	}
},
	elementsContainer);
section.addElement();
