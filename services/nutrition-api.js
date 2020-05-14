// https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=1%20large%20apple

const fetch = require("node-fetch");
require("dotenv").config(); // import API KEY

function parseResult(quantity, size, name) {
  return quantity + "%20" + size + "%20" + name;
}
function parseArray(arr) {
  arr_new = [];
  for (var i = 0; i < arr.length; i++) {
    var element = arr[i].replace("_", " ");
    var capitalze = element
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    arr_new.push(capitalze);
  }
  return arr_new;
}
// console.log(parseArray(["San_diego", "tokyo_Sk"]));
var foodAPI = {
  get_nutrients: function (req, res) {
    console.log(req.body);
    const query = parseResult(req.body.quantity, req.body.size, req.body.name);
    console.log(query);
    // query = "1%20large%20crepe";
    fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}&ingr=${query}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        NutrientInfo = data["totalNutrients"];
        TotalCalories = data["calories"];
        TotalWeight = data["totalWeight"];
        DietLabel = parseArray(data["dietLabels"]);
        HealthLabel = parseArray(data["healthLabels"]);
        Cautions = parseArray(data["cautions"]);
        res.send({
          HealthLabel: HealthLabel,
          Cautions: Cautions,
          yield: data["yield"],
          calorie: TotalCalories,
          weight: TotalWeight,
          diet: DietLabel,
          nutrient: NutrientInfo,
        });
      })
      .catch((error) => {
        res.send({
          yield: 0,
          calorie: 0,
          weight: 0,
          diet: null,
          nutrient: error,
        });
      });
  },
};
module.exports = foodAPI;
