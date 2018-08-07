class managerCache {
  constructor() {}

  checkSession() {
    return (
      sessionStorage.getItem("authToken") && sessionStorage.getItem("userId")
    );
  }
}

module.exports = new managerCache();
