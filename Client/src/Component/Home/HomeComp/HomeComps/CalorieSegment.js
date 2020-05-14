import React from "react";
import { Header, Grid, Segment, Divider } from "semantic-ui-react";
const CalorieSeg = (props) => {
  const api_data = props.objectArr;
  const NutrietArr =
    api_data["nutrient"] === undefined
      ? []
      : Object.values(api_data["nutrient"]);

  const slicer = (NutrietArr.length / 2) | 0;
  const NutrietArrFirst = NutrietArr.splice(0, slicer);
  const NutrietArrSecond = NutrietArr;
  return (
    <Segment className={"calorie-segment"}>
      <div>
        <Header className={"Nutrition-Facts"}>Nutrition Facts</Header>
      </div>
      <div className={"top-nut-div"}>
        <Header className={"top-nut"}>Serving Size: {props.quantity} </Header>
        <Header className={"top-nut"}>Food: {props.name}</Header>
        <Header className={"top-nut"}>
          Weight: {api_data === undefined ? 0 : api_data["weight"]} grams
        </Header>
        <Header className={"top-nut"}>
          Servings Per container:{" "}
          {api_data === undefined ? "None" : api_data["yield"]}
        </Header>
        <Header className={"top-nut"}>
          Calories: {api_data === undefined ? "None" : api_data["calorie"]}
        </Header>
      </div>
      <Divider />
      <Grid columns={2} stackable={true} relaxed="very">
        <Grid.Column>
          <Grid.Row>
            {NutrietArrFirst.map((Element, index) => {
              return (
                <>
                  <div key={index} className={"cal-info"}>
                    <div>
                      <Header className={"f"}>{Element.label}</Header>
                    </div>
                    <div className={"f"}>
                      <Header>
                        {Element.quantity.toFixed(2)} {Element.unit}
                      </Header>
                    </div>
                  </div>
                  <Divider />
                </>
              );
            })}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            {NutrietArrSecond.map((Element2, index) => {
              return (
                <>
                  <div key={index} className={"cal-info"}>
                    <div>
                      <Header className={"f"}>{Element2.label}</Header>
                    </div>
                    <div className={"f"}>
                      <Header>
                        {Element2.quantity.toFixed(2)} {Element2.unit}
                      </Header>
                    </div>
                  </div>
                  <Divider />
                </>
              );
            })}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default CalorieSeg;
