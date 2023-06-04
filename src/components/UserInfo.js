export default class UserInfo {
	constructor(dataName, dataAbout, dataAvatar) {
		this._name = dataName;
		this._info = dataAbout;
		this._avatar = dataAvatar;
	}
	getUserInfo() {
		return {
			data: this._name.textContent,
			about: this._info.textContent
		}
	}
	setUserInfo(data) {
		this._name.textContent = data.name;
		this._info.textContent = data.about;
		this._avatar.src = data.avatar;
	}
}