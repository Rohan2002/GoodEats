/* eslint-disable no-plusplus */
// https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=1%20large%20apple

const fetch = require('node-fetch');
require('dotenv').config(); // import API KEY

function parseResult(quantity, size, name) {
  return (`${quantity}%20${size}%20${name}`);
}
function parseArray(arr) {
  const arrNew = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i].replace('_', ' ');
    const capitalze = element
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    arrNew.push(capitalze);
  }
  return arrNew;
}
// console.log(parseArray(['San_diego', 'tokyo_Sk']));
const foodAPI = {
  get_nutrients(req, res) {
    const query = parseResult(req.body.quantity, req.body.size, req.body.name);
    // format: query = '1%20large%20crepe';
    fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}&ingr=${query}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const NutrientInfo = data.totalNutrients;
        const TotalCalories = data.calories;
        const TotalWeight = data.totalWeight;
        const DietLabel = parseArray(data.dietLabels);
        const HealthLabel = parseArray(data.healthLabels);
        const Cautions = parseArray(data.cautions);
        res.send({
          HealthLabel,
          Cautions,
          yield: data.yield,
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
