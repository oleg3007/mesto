
let page = document.querySelector('.page');
let main = page.querySelector('.main');
let profile = main.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popupButton = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');
let popupCros = popup.querySelector('.popup__cros');
let popupHieldName = popup.querySelector('.popup__hield_name');
let popupHieldAboutMe = popup.querySelector('.popup__hield_about-me');
let profileTittle = document.querySelector('.profile__tittle');
let profileText = document.querySelector('.profile__text');
let formElement = document.querySelector('.popup__conteiner');

function popupActiv (){
	popupHieldName.value = profileTittle.textContent;
	popupHieldAboutMe.value = profileText.textContent;
	popup.classList.add('popup_active');
}
function popupRemove() {
	popup.classList.remove('popup_active');
}
function handleFormSubmit(evt) {
	evt.preventDefault();
	profileTittle.textContent = popupHieldName.value;
	profileText.textContent = popupHieldAboutMe.value;
	popupRemove();
}

popupCros.onclick = popupRemove;
profileEditButton.onclick = popupActiv;
formElement.addEventListener('submit', handleFormSubmit); 
