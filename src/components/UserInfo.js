export default class UserInfo {
	constructor(dataName, dataAbout) {
		this._name = dataName;
		this._info = dataAbout;
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
	}
}