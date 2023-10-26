class UserDTO {
  // - Constructor
  constructor(user) {
    this._id = user._id;
    this.username = user.username;
    this.email = user.email;
  }

  // After constructor -> initialize in authController
}

// - Export
module.exports = UserDTO;
