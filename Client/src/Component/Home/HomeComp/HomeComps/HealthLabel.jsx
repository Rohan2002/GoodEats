import React from "react";
import { Segment, Header, Label } from "semantic-ui-react";

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const AnyLabel = (props) => {
  return (
    <>
      <Header>{props.mainLabel} Labels:</Header>
      {props.mainArr.map((label) => {
        return (
          <Label key={label} color={colors[getRandomInt(colors.length - 1)]}>
            <Header style={{ color: "white", "font-size": "1.5em" }}>
              {label}
            </Header>
          </Label>
        );
      })}
    </>
  );
};

const HealthLabel = (props) => {
  const HealthArray =
    props.HealthArray["HealthLabel"] === undefined
      ? []
      : props.HealthArray["HealthLabel"];
  const DietArray =
    props.DietArray["DietLabel"] === undefined
      ? []
      : props.DietArray["DietLabel"];
  const CautionArray =
    props.CautionArray["Cautions"] === undefined
      ? []
      : props.CautionArray["Cautions"];
  return (
    <>
      <Segment>
        <div>
          <AnyLabel mainLabel="Health" mainArr={HealthArray} />
        </div>
        <div>
          <AnyLabel mainLabel="Diet" mainArr={DietArray} />
        </div>
        <div>
          <AnyLabel mainLabel="Caution" mainArr={CautionArray} />
        </div>
      </Segment>
    </>
  );
};
export default HealthLabel;
