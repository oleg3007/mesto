
const page = document.querySelector('.page');
const main = page.querySelector('.main');

const profile = main.querySelector('.profile');
export const profileTitle = document.querySelector('.profile__title');
export const profileText = document.querySelector('.profile__text');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAddButton = profile.querySelector('.profile__add-button');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const profileAvatarButton = profile.querySelector('.profile__avatar-button');

export const popupProfile = document.querySelector('.popup-profile');
export const popupHieldName = popupProfile.querySelector('.popup__hield_enter_name');
export const popupHieldAboutMe = popupProfile.querySelector('.popup__hield_enter_about');

export const popupItem = document.querySelector('.popup-item');

export const popupAvatar = document.querySelector('.popup-avatar');

export const elementsContainer = main.querySelector('.elements');

export const popupImage = document.querySelector('.popup-image');

export const popupRemoval = document.querySelector('.popup-removal');

export const config = {
	formSelector: '.popup__form',
	inputSelector: '.popup__hield',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__hield_type_error',
	errorClass: 'popup__error_visible',
	spanClassTypeField: '.popup__form-input-error_field_'
}
export const configCard = {
	eventCard: '.event-card',
	element: '.element',
	elementTitle: '.element__title',
	elementMaskGroup: '.element__mask-group',
	elementGroup: '.element__group',
	elementGroupColorBlack: 'element__group_color_black',
	elementTrash: '.element__trash',
	elementNanbersLike: '.element__numbers-like',
}
