
let page = document.querySelector('.page');
let main = page.querySelector('.main');

let profile = main.querySelector('.profile');
let profileTitle = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');
let profileAddButton = profile.querySelector('.profile__add-button');
let profileEditButton = profile.querySelector('.profile__edit-button');

let popupButton = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');
let popupCros = popup.querySelector('.popup__cros');
let popupHieldName = popup.querySelector('.popup__hield_enter_name');
let popupHieldAboutMe = popup.querySelector('.popup__hield_enter_about-me');
let formElement = document.querySelector('.popup__conteiner');

let popupCrosItem = document.querySelector('.popup-item__cros');
let popupItem = document.querySelector('.popup-item');
let popupItemButton = document.querySelector('.popup-item__button');

let elements = main.querySelector('.elements');
let element = elements.querySelector('.element');


function popupActiv (){
	popupHieldName.value = profileTitle.textContent;
	popupHieldAboutMe.value = profileText.textContent;
	popup.classList.add('popup_active');
}


function popupRemove() {
	popup.classList.remove('popup_active');
	popupItem.classList.remove('popup_active');
}
function popupItemActiv() {
	popupItem.classList.add('popup_active');
}

function handleFormSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = popupHieldName.value;
	profileText.textContent = popupHieldAboutMe.value;
	popupRemove();
}

function addElement (linkElement, titleElement) {
	const eventCard = document.querySelector('#event-card').content; // Находим заготовленый блок
	const element = eventCard.querySelector('.element').cloneNode(true); // Кланируем его

	element.querySelector('.element__mask-group').src = linkElement; // заполняем
	element.querySelector('.element__title').textContent = titleElement;

		

	element.querySelector('.element__trash').addEventListener('click', function () {
			element.remove();
	});
	// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg

	elements.prepend(element);  

	popupRemove();
}



popupCros.onclick = popupRemove;
popupCrosItem.onclick = popupRemove;
profileEditButton.onclick = popupActiv;
formElement.addEventListener('submit', handleFormSubmit); 
profileAddButton.addEventListener('click', popupItemActiv);
popupItemButton.addEventListener('click', function (){
	const popupItemTitle = popupItem.querySelector('.popup__hield_enter_title');
	const popupItemLink = popupItem.querySelector('.popup__hield_enter_link');
	addElement(popupItemLink.value, popupItemTitle.value)
	popupItemTitle.value = '';
	popupItemLink.value = '';
});

