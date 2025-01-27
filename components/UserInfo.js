export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    // Get user information
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        };
    }

    // Set user information
    setUserInfo({ name, job }) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
}
