import { getItems } from '../components/api.js';
import { getCards } from '../components/api.js';
import { toSentProfile } from '../components/api.js';

import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
	popupProfile,
	profileTitle,
	profileText,
	profileAvatar,
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

getItems().then((res) => {
	// console.log(res);
	submitFormProfile(res);
});

getCards().then((res) => {
	// console.log(res);
	const datas = res
	initialCards(datas);
})

function profileData(data, about) {
	toSentProfile(data, about).then((res) => {
		console.log(res);
	});
}


const validatorPopupItem = new FormValidator(popupItem, config);
validatorPopupItem.enableValidation();

const validatorPopupProfile = new FormValidator(popupProfile, config);
validatorPopupProfile.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);

const userInfo = new UserInfo(profileTitle, profileText);

// popup добовлений карточки
profileAddButton.addEventListener('click', () => {
	popupWithFormItem.open();
	validatorPopupItem.disableButton();
});
// popup заполнения профиля
profileEditButton.addEventListener('click', () => {
	const { data, about } = userInfo.getUserInfo();
	// profileData(data, about);
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
	popupProfile, submitFormProfile);

function submitFormProfile(data) {
	userInfo.setUserInfo(data);
	profileData(data.name, data.about)
}
popupWithFormProfile.setEventListeners();

const popupWithFormItem = new PopupWithForm(
	popupItem,
	function submitFormCard({ placeName, link }) {
		section.addItem(createCard(placeName, link))
	}
)
popupWithFormItem.setEventListeners();

// Функция создаеия разметки карточки
function createCard(nameCard, linkCard, likesCard) {
	const card = new Card(nameCard, linkCard, likesCard, configCard, openPopupImage);
	const elementCard = card.generatorCard();
	return elementCard;
}

// Контик заполнения и размещение карточки
const section = new Section(initialCards, elementsContainer);

// Формирование стартовых карточек на страницу
const initialCards = (datas) => {
	datas.forEach((data) => {
		section.addItem(createCard(data.name, data.link, data.likes.length));
	})
}
