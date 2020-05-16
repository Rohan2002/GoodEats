const classify = require('../services/ibm-waston');
const foodAPI = require('../services/nutrition-api');

const controllers = {
  API_CALL_UPLOAD(req, res) {
    classify.find_upload(req, res);
  },
  API_CALL_CAMERA(req, res) {
    classify.camera_upload(req, res);
  },
  FOOD_API(req, res) {
    foodAPI.get_nutrients(req, res);
  },
};
module.exports = controllers;
