// https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=1%20large%20apple

const fetch = require("node-fetch");
require("dotenv").config(); // import API KEY

function parseResult(quantity, size, name) {
  return quantity + "%20" + size + "%20" + name;
}

var foodAPI = {
  get_nutrients: async function (req, res) {
    const query = parseResult(req.body.quantity, req.body.size, req.body.name);
    await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}&ingr=${query}`
    )
      .then((res) => res.text())
      .then((body) => console.log(body));
  },
};
module.exports = foodAPI;
