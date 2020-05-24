const AuthService = require('../services/auth-service');

const authController = {
  TOKEN(req, res) {
    return AuthService.get_token(req, res);
  },
  LOGIN(req, res) {
    return AuthService.login(req, res);
  },
  LOGOUT(req, res) {
    return AuthService.logout(req, res);
  },
  CHECKTOKEN(req, res) {
    return res.sendStatus(200);
  },
  REGISTER(req, res) {
    return AuthService.register(req, res);
  },
};
module.exports = authController;
