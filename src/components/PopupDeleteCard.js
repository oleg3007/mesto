import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup-removal__form');
    this._submitBtn = this._form.querySelector('.popup-removal__button');
  }

  open (card, submitFunction) {
    super.open();
    this._card = card;
    this._submitFunction = submitFunction;
    this._submitBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._card._id);
      this.close();
     });
  }
}