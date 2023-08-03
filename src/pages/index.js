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
} from '../utils/constants.js';

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
	headers: {
	  authorization: '25bce6e4-fd9b-4672-9cb4-33ee46971c81',
	  'Content-Type': 'application/json'
	}
  });
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
	api.patchToSentProfile(data)
	.then(userInfo.setUserInfo(data))
	.catch((error => console.error(`Ошибка заполнения профиля ${error}`)))
	.finally(() => {
		popupWithFormProfile.setDefaultText();
		popupWithFormProfile.close();
	})
};

// Функция заполнения и закрытий popup-item
const popupWithFormItem = new PopupWithForm(
	popupItem,
	(data) => {
		api.toSentCard(data.name, data.link)
		.then(data => {
			section.addItem(createCard(data, userId));
		})
		.catch((error => console.error(`Ошибка создание карточки ${error}`)))
		.finally(() => {
			popupWithFormItem.setDefaultText();
			popupWithFormItem.close();
		})
	}
)
popupWithFormItem.setEventListeners();

// Функция заполнения и закрытий popup-avatar
function submitFormAvatar(data) {
	api.patchToSentAvatar(data)
	.then(userInfo.setUserAvatar(data))
	.catch((error => console.error(`Ошибка добовления аватара ${error}`)))
	.finally(() => {
		popupWithFormAvatar.setDefaultText();
		popupWithFormAvatar.close()
	})
};

// Функция popup удаления карточки
const deletePopupCard  = new PopupDeleteCard(popupRemoval, ({ card, cardId }) => {
	console.log(cardId)
	api.deleteCard(cardId)
	  .then(() => {
		card.deletIngCard();
	  })
	  .catch((error => console.error(`Возникла ошибка при попытке удаления карточки ${error}`)))
	  .finally(() => deletePopupCard.close())
  });
  deletePopupCard.setEventListeners();
function interactionIngWithLikesCards(card, cardId) {
	if (card.buttenLike()) {
		api.deleteLikeCard(cardId)
		.then(res =>card.paintingOverHeart(res.likes))
		.catch((error => console.error(`Ошибка удаления лайка ${error}`)))
	} else {
		api.putLikeCard(cardId)
		.then(res => card.paintingOverHeart(res.likes))
		.catch((error => console.error(`Ошибка постовления лайка ${error}`)))
	}
}

// Функция создаеия разметки карточки
function createCard(data, userId) {
	const card = new Card(data, userId, configCard, openPopupImage, deletePopupCard.open, interactionIngWithLikesCards);
	const elementCard = card.generatorCard();
	return elementCard;
}

const section = new Section({  
	renderer: (data) => {
		section.addItem(createCard(data, userId)); 
	} 
}, 
	elementsContainer); 
 