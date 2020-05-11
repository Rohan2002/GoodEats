import React from "react";
import "./HomeComp.css";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Header, Grid, Segment } from "semantic-ui-react";

const ResultSegment = (props) => {
  return (
    <Segment className={"results-segment"}>
      <div>
        <Header className={"result-header"}>Name: {props.result}</Header>
      </div>
      <div className={"score-div"}>
        <Header>Probability: {(props.score * 100).toFixed(2)}%</Header>
      </div>
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
      DataLength:0
    };
  }
  componentDidMount() {
    // Cookie auth for bad or expired cookies!
    const { cookies } = this.props;
    const CookieData = cookies.get("Data");
    if (CookieData == undefined) {
      this.props.history.push("/upload");
    }
    this.setState({ Status: CookieData.Status });
    this.setState({ Data: CookieData.Data }, () => {
      console.log(this.state.Data);
    });
    this.setState({DataLength:CookieData.Data.length})
    // this.setState({Data: {Message:"Hello"}})
  }
  render() {
    return (
      <div className={"mainhome container"}>
        <div className={"inner-home"}>
          <Header className={"Main_Header"}>Image Recognition Results</Header>
          <div>
            <Grid columns={this.state.DataLength + 1} stackable={true}>
              <Grid.Row>
                {this.state.Data.map((result) => {
                  return (
                    <Grid.Column>
                      <ResultSegment
                        result={result.name}
                        score={result.score}
                      />
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
export default withCookies(withRouter(HomeComp));
