import { getItems } from '../components/api.js';

import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
	popupProfile,
	profileTitle,
	profileText,
	profileAddButton,
	profileEditButton,
	popupHieldName,
	popupHieldAboutMe,
	popupItem,
	elementsContainer,
	popupImage,
	config,
	configCard
} from '../utils/constants.js';

// getItems();

const validatorPopupItem = new FormValidator(popupItem, config);
validatorPopupItem.enableValidation();

const validatorPopupProfile = new FormValidator(popupProfile, config);
validatorPopupProfile.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);

const userInfo = new UserInfo({
	name: profileTitle,
	info: profileText
});

// popup добовлений карточки
profileAddButton.addEventListener('click', () => {
	popupWithFormItem.open();
	validatorPopupItem.disableButton();
});
// popup заполнения профиля
profileEditButton.addEventListener('click', () => {
	const { data, about } = userInfo.getUserInfo();
	popupHieldName.value = data;
	popupHieldAboutMe.value = about;
	popupWithFormProfile.open();
	validatorPopupProfile.disableButton();
})

// popup открытия картинки
function openPopupImage(titleElement, linkElement) {
	popupWithImage.open(titleElement, linkElement);
}
popupWithImage.setEventListeners();

// Функция заполнения и закрыти popup-profile
const popupWithFormProfile = new PopupWithForm(
	popupProfile,
	function submitFormProfile(data) {
		userInfo.setUserInfo(data);
	}
)
popupWithFormProfile.setEventListeners();

const popupWithFormItem = new PopupWithForm(
	popupItem,
	function submitFormCard({ placeName, link }) {
		section.addItem(createCard(placeName, link))
	}
)
popupWithFormItem.setEventListeners();

// Функция создаеия разметки карточки
function createCard(nameCard, linkCard) {
	const card = new Card(nameCard, linkCard, configCard, openPopupImage);
	const elementCard = card.generatorCard();
	return elementCard;
}

// Контик заполнения и размещение карточки
const section = new Section({
	items: initialCards,
	renderer: (placeName, link) => {
		section.addItem(createCard(placeName, link));
	}
},
	elementsContainer);
section.renderItems();
