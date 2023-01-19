
let page = document.querySelector('.page');
let main = page.querySelector('.main');
let profile = main.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popupButton = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');
let popupCros = popup.querySelector('.popup__cros');


let elements = main.querySelector('.elements');
let elementGroup = elements.querySelectorAll('.element .element__group');

function popupActiv (){
	popup.classList.toggle('popup-opened');
}

function handleFormSubmit(evt) {
	let popupName = popup.querySelector('.popup__hield_name').value;
	let popupYourHobby = popup.querySelector('.popup__hield_About-me').value;
	let profileTittle = document.querySelector('.profile__tittle');
	let profileText = document.querySelector('.profile__text');
	profileTittle.textContent = popupName;
	profileText.textContent = popupYourHobby;
}

popupButton.addEventListener('click', function(){
	handleFormSubmit();
	popupActiv();
});

popupCros.onclick = popupActiv;
profileEditButton.onclick = popupActiv;



for (i = 0; i < elementGroup.length; i++){
	elementGroup[i].onclick = clickGroup;
}

function clickGroup(){
	this.classList.toggle('element__group_color_black');
}
elementGroup.onclick = clickGroup;