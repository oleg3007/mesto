import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard';
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
	popupRemoval,
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
popupWithImage.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(popupRemoval)
popupDeleteCard.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(popupAvatar, submitFormAvatar);
popupWithFormAvatar.setEventListeners();

const popupWithFormProfile = new PopupWithForm(popupProfile, submitFormProfile);
popupWithFormProfile.setEventListeners();

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

// Функция заполнения и закрыти popup-profile
function submitFormProfile(data) {
	userInfo.setUserInfo(data);
	api.patchToSentProfile(data)
	.catch((error => console.error(`Ошибка заполнения профиля ${error}`)))
	.finally(() => popupWithFormProfile.textInButton())
};

// Функция заполнения и закрытий popup-item
const popupWithFormItem = new PopupWithForm(
	popupItem,
	(data) => {
		api.toSentCard(data.name, data.link)
		.then(data => {
			section.addItem(createCard(data, userId))
		})
		.catch((error => console.error(`Ошибка создание карточки ${error}`)))
		.finally(() => popupWithFormItem.textInButton())
	}
)
popupWithFormItem.setEventListeners();

// Функция заполнения и закрытий popup-avatar
function submitFormAvatar(data) {
	userInfo.setUserAvatar(data);
	api.patchToSentAvatar(data)
	.catch((error => console.error(`Ошибка добовления аватара ${error}`)))
	.finally(() => popupWithFormAvatar.textInButton())
};

// Функция popup удаления карточки
function cardDelete(card, element) {
	popupDeleteCard.open(element, () => {
		api.cardDelete(element._id)
		.then(() => card.deletingCard())
		.catch((error => console.error(`Ошибка удаления карточки ${error}`)))
	});
}

// Функция создаеия разметки карточки
function createCard(data, userId) {
	const card = new Card(data, userId, configCard, openPopupImage, cardDelete);
	const elementCard = card.generatorCard();
	return elementCard;
}

const section = new Section({  
	renderer: (data) => { 
		section.addItem(createCard(data, userId)); 
	} 
}, 
	elementsContainer); 
 