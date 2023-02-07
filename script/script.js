
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

const eventCard = document.querySelector('#event-card');
const element = eventCard.querySelector('.element');

const popupImage = document.querySelector('.popup-image');
const popupImageCros = popupImage.querySelector('.popup-image__cros');
const popupImageFoto = popupImage.querySelector('.popup-image__foto');
const popupImageSignature = popupImage.querySelector('.popup-image__signature');

// функция активации popup
function popupActiv (block){
	block.classList.add('popup_active');
}

profileAddButton.addEventListener('click', () => popupActiv(popupItem));

profileEditButton.addEventListener('click', function () {
	popupHieldName.value = profileTitle.textContent;
	popupHieldAboutMe.value = profileText.textContent;
	popupActiv(popupProfile);
})

// Функциb закрытия popup
function popupRemove(block) {
	block.classList.remove('popup_active');
}

// Функция заполнения и закрыти popup-profile
function handleFormSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = popupHieldName.value;
	profileText.textContent = popupHieldAboutMe.value;
	popupRemove(popupProfile);
}
// popup открытия картинки
function openPopupImage(titleElement, linkElement) {
	popupImageFoto.src = linkElement;
	popupImageFoto.alt = titleElement;
	popupImageSignature.textContent = titleElement;
	popupActiv(popupImage);
}

// создание карточки
function addElement (linkElement, titleElement) {
	const eventCard = document.querySelector('#event-card').content;  
	const element = eventCard.querySelector('.element').cloneNode(true);

	element.querySelector('.element__mask-group').src = linkElement;
	element.querySelector('.element__mask-group').alt = titleElement; 
	element.querySelector('.element__title').textContent = titleElement;
	// Сердечка (лайк)
	element.querySelector('.element__group').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__group_color_black');
	})
	// Урна (удаление)
	element.querySelector('.element__trash').addEventListener('click', function () {
			element.remove();
	})

	element.querySelector('.element__mask-group').addEventListener('click', function() { 

		openPopupImage(titleElement, linkElement);
})
	return element
}

popupCros.addEventListener('click', () => popupRemove(popupProfile));
popupCrosItem.addEventListener('click', () => popupRemove(popupItem));
popupImageCros.addEventListener('click', () => popupRemove(popupImage));

formElement.addEventListener('submit', handleFormSubmit); 

// popup-item передача аргументов addElement
 popupItemButton.addEventListener('click', function (){
	elements.prepend(addElement(popupItemLink.value, popupItemTitle.value));
	popupItemTitle.value = '';
	popupItemLink.value = '';
	popupRemove(popupItem);
})

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

for (let i = 0; i < 6; i++) {
	elements.prepend(addElement(initialCards[i].link, initialCards[i].name));
}
