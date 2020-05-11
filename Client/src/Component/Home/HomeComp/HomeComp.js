import React, { useState } from "react";
import "./HomeComp.css";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import {
  Header,
  Grid,
  Segment,
  Divider,
  Container,
  GridRow,
} from "semantic-ui-react";
import axios from "axios";

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
      <div>
        <Header className={"nutriton-start"}>
          Serving Size {props.quantity} {props.name}{" "}
          {api_data === undefined ? 0 : api_data["weight"]} grams
          <br />
          Servings Per container{" "}
          {api_data === undefined ? "None" : api_data["yield"]}
        </Header>
      </div>
      <Divider />
      <div>
        Calories {api_data === undefined ? "None" : api_data["calorie"]}
      </div>
      <Divider />
      <Grid columns={2} stackable={true} relaxed="very">
        <Grid.Column>
          <Grid.Row>
            {NutrietArrFirst.map((Element,index) => {
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
                <Divider/>
                </>
              );
            })}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            {NutrietArrSecond.map((Element2,index) => {
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
                <Divider/>
                </>
              );
            })}
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <Divider vertical></Divider>
    </Segment>
  );
};

class HomeComp extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      Status: 0,
      Data: [],
      DataLength: 0,
      SelectedFood: "None Selected",
      calorieLoad: -1,
      CalorieData: {},
      NutrientData: [],
      NutrientAPIParam: { quantity: 1, size: "large" },
    };
  }

  componentDidMount() {
    // Cookie auth for bad or expired cookies!
    const { cookies } = this.props;
    const CookieData = cookies.get("Data");
    if (
      CookieData === undefined ||
      CookieData.Status === undefined ||
      CookieData.Data === undefined
    ) {
      this.props.history.push("/upload");
    } else {
      this.setState({ Status: CookieData.Status });
      this.setState({ Data: CookieData.Data }, () => {
        console.log(this.state.Data);
      });
      this.setState({ DataLength: CookieData.Data.length });
    }
  }

  async getCalorieInfo() {
    const pointer = this;
    await axios
      .post("http://localhost:8080/api/foodSelect", {
        quantity: this.state.NutrientAPIParam.quantity,
        size: this.state.NutrientAPIParam.size,
        name: pointer.state.SelectedFood,
      })
      .then(function (response) {
        return response;
      })
      .then(function (data) {
        console.log(data.data.calorie);
        pointer.setState({ CalorieData: data.data }, () =>
          console.log(pointer.state.CalorieData)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onClickHandler(name) {
    this.setState({ SelectedFood: name }, () => {
      this.getCalorieInfo();
      this.setState({ calorieLoad: 1 });
    });
  }
  render() {
    return (
      <div className={"mainhome container"}>
        <div className={"inner-home"}>
          {/*Starting Image Recognition*/}
          <div>
            <Header className={"Main_Header"}>Image Recognition Results</Header>
            <Header className={"small_Header"}>
              (Select any result below)
            </Header>
            <div className={"rec-div"}>
              <Grid columns={this.state.DataLength + 1} stackable={true}>
                <Grid.Row>
                  {this.state.Data.map((result) => {
                    return (
                      <Grid.Column>
                        <Segment
                          onClick={() => this.onClickHandler(result.name)}
                          className={"results-segment"}
                        >
                          <div>
                            <Header className={"result-header"}>
                              Name: {result.name}
                            </Header>
                          </div>
                          <div className={"score-div"}>
                            <Header>
                              Probability: {(result.score * 100).toFixed(2)}%
                            </Header>
                          </div>
                        </Segment>
                      </Grid.Column>
                    );
                  })}
                </Grid.Row>
              </Grid>
            </div>
          </div>

          {/*Starting Nutrition*/}
          <div className={"nut-div"}>
            <Header className={"Main_Header"}>Nutrition Results</Header>

            <CalorieSeg
              quantity={this.state.NutrientAPIParam.quantity}
              name={this.state.SelectedFood}
              weight={10}
              objectArr={this.state.CalorieData}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withCookies(withRouter(HomeComp));
