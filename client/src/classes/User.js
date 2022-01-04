export default class User {
    constructor(theme, userId, userName) {
        this.theme = theme;
        this.userId = userId;
        this.userName = userName;
    }

    getTheme = () => {
        return this.theme;
    };

    getUserId = () => {
        return this.userId;
    };

    getUserName = () => {
        return this.userName;
    };

    setTheme = (theme) => {
        this.theme = theme;
    };
}
