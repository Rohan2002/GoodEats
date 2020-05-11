const classify = require("../services/ibm-waston");
const foodAPI = require("../services/nutrition-api");
var controllers = {
  API_CALL_UPLOAD: function(req, res) {
    classify.find_upload(req,res)
  },
  API_CALL_CAMERA: function(req, res) {
    classify.camera_upload(req,res)
  },
  FOOD_API: function(req, res) {
    foodAPI.get_nutrients(req,res)
  }
};
module.exports = controllers;
