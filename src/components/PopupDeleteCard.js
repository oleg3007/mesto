import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._submitBtn = this._popup.querySelector('.popup-removal__button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitBtn.addEventListener('click', () => {
      this._submitFunction({ card: this._card, cardId: this._cardId });
     });
  }

  open = ({ card, cardId }) => {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
}