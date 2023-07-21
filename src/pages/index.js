import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
	popupProfile,
	profileTitle,
	profileText,
	profileAvatar,
	profileAddButton,
	profileEditButton,
	profileAvatarButton,
	popupHieldName,
	popupHieldAboutMe,
	popupItem,
	popupAvatar,
	elementsContainer,
	popupImage,
	config,
	configCard,
	configApi
} from '../utils/constants.js';

const api = new Api(configApi);

let userId = null;

Promise.all([api.getServerUser(), api.getServerCard()])
	.then(([dataUser, cards]) => {
		submitFormProfile(dataUser);
		submitFormAvatar(dataUser);
		userId = dataUser._id;
		section.renderItems(cards, userId); 
		console.log(userId);
	})
	.catch(errs => {
		console.log(errs);
	})

const validatorPopupItem = new FormValidator(popupItem, config);
validatorPopupItem.enableValidation();

const validatorPopupProfile = new FormValidator(popupProfile, config);
validatorPopupProfile.enableValidation();

const validatorPopupAvatar = new FormValidator(popupAvatar, config);
validatorPopupAvatar.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);

const userInfo = new UserInfo(profileTitle, profileText, profileAvatar);

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
});

// popup аватара
profileAvatarButton.addEventListener('click', () => {
	popupWithFormAvatar.open();
	validatorPopupAvatar.disableButton()
});

// popup открытия картинки
function openPopupImage(titleElement, linkElement) {
	popupWithImage.open(titleElement, linkElement);
};
popupWithImage.setEventListeners();

// Функция заполнения и закрыти popup-profile
const popupWithFormProfile = new PopupWithForm(popupProfile, submitFormProfile);

function submitFormProfile(data) {
	userInfo.setUserInfo(data);
	api.patchToSentProfile(data)
};
popupWithFormProfile.setEventListeners();

// Функция заполнения и закрытий popup-item
const popupWithFormItem = new PopupWithForm(
	popupItem,
	function submitFormCard(data) {
		api.toSentCard(data.name, data.link)
		.then(data => {
			section.addItem(createCard(data, userId))
		});
	}
)
popupWithFormItem.setEventListeners();

// Функция заполнения и закрытий popup-avatar
const popupWithFormAvatar = new PopupWithForm(popupAvatar, submitFormAvatar);

function submitFormAvatar(data) {
	userInfo.setUserAvatar(data);
	api.patchToSentAvatar(data)
};
popupWithFormAvatar.setEventListeners();

// Функция создаеия разметки карточки
function createCard(data, userId) {
	const card = new Card(data, userId, configCard, openPopupImage);
	const elementCard = card.generatorCard();
	return elementCard;
}

// // Контик заполнения и размещение карточки
// const section = new Section(initialCards, elementsContainer);

// // Формирование стартовых карточек на страницу
// const initialCards = (data) => {
// 	const placeItem = createCard(data);
// 	section.addItem(placeItem);
// }

const section = new Section({ 
	// items: initialCards, 
	renderer: (data) => { 
		section.addItem(createCard(data, userId)); 
	} 
}, 
	elementsContainer); 
// section.renderItems(); 
 