
let page = document.querySelector('.page');
let main = page.querySelector('.main');
let profile = main.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popupButton = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');
let opopupItem = document.querySelector('.popup-item');
let popupCros = popup.querySelector('.popup__cros');
let popupHieldName = popup.querySelector('.popup__hield_enter_name');
let popupHieldAboutMe = popup.querySelector('.popup__hield_enter_about-me');
let profileTitle = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');
let profileAddButton = profile.querySelector('.profile__add-button');
let formElement = document.querySelector('.popup__conteiner');

function popupActiv (){
	popupHieldName.value = profileTitle.textContent;
	popupHieldAboutMe.value = profileText.textContent;
	popup.classList.add('popup_active');
}


function popupRemove() {
	popup.classList.remove('popup_active');
	opopupItem.classList.remove('popup_active');
}
function popupItemActiv() {
	opopupItem.classList.add('popup_active');
}

function handleFormSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = popupHieldName.value;
	profileText.textContent = popupHieldAboutMe.value;
	popupRemove();
}

popupCros.onclick = popupRemove;
opopupItem.onclick = popupRemove;
profileEditButton.onclick = popupActiv;
formElement.addEventListener('submit', handleFormSubmit); 
profileAddButton.addEventListener('click', popupItemActiv);
