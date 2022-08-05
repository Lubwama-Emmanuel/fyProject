module.exports = class Email {
  constructor(user, url) {
    this.email = user.email;
    this.firstName = user.names.split(" ")[0];
    this.url = url;
  }
};
