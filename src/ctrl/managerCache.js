class managerCache {
    constructor() {
    }

    checkSession() {
        if (sessionStorage.getItem("authToken") && sessionStorage.getItem("userId")) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new managerCache();
