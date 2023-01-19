
let page = document.querySelector('.page');
let main = page.querySelector('.main');
let profile = main.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popupButton = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');
let popupCros = popup.querySelector('.popup__cros');
let profileTittle = document.querySelector('.profile__tittle');
let profileText = document.querySelector('.profile__text');
let formElement = document.querySelector('.popup__conteiner');

function popupActiv (evt){
	evt.preventDefault();
	popup.querySelector('.popup__hield_name').value = profileTittle.textContent;
	popup.querySelector('.popup__hield_About-me').value = profileText.textContent;
	popup.classList.add('popup-opened');
}

function handleFormSubmit(evt) {
	evt.preventDefault();
	profileTittle.textContent = popup.querySelector('.popup__hield_name').value;
	profileText.textContent = popup.querySelector('.popup__hield_About-me').value;
	popup.classList.remove('popup-opened');

}
function popupRemove(evt){
	evt.preventDefault();
	popup.classList.remove('popup-opened');
}

popupCros.onclick = popupRemove;
profileEditButton.onclick = popupActiv;
formElement.addEventListener('submit', handleFormSubmit); 
