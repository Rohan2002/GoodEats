/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import React from 'react';
import './HomeComp.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import {
  Header, Grid, Segment, Dimmer, Loader,
} from 'semantic-ui-react';
import axios from 'axios';
import CalorieSeg from './HomeComps/CalorieSegment';
import ModalParam from './HomeComps/ModalSelect';
import HealthLabel from './HomeComps/HealthLabel';

class HomeComp extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      DataLength: 0,
      SelectedFood: 'None Selected',
      calorieLoad: -1,
      CalorieData: {},
      NutrientAPIParamQuantity: 1,
      NutrientAPIParamSize: '',
      ModalStatus: true,
    };
  }

  componentDidMount() {
    // Cookie auth for bad or expired cookies!
    const { cookies } = this.props;
    const CookieData = cookies.get('Data');
    if (
      CookieData === undefined
      || CookieData.Status === undefined
      || CookieData.Data === undefined
    ) {
      this.props.history.push('/upload');
    } else if (CookieData.Status === 500) {
      alert('Image not processed! ');
      this.setState({ Data: [] }, () => {
        console.log('Empty');
      });
      this.setState({ DataLength: 0 });
    } else {
      this.setState({ Data: CookieData.Data }, () => {
        console.log('Filled');
      });
      this.setState({ DataLength: CookieData.Data.length });
    }
  }

  onClickHandler(name) {
    this.setState({ SelectedFood: name });
  }

  async getCalorieInfo() {
    const pointer = this;
    await axios
      .post('http://localhost:8080/api/foodSelect', {
        quantity: pointer.state.NutrientAPIParamQuantity,
        size: pointer.state.NutrientAPIParamSize,
        name: pointer.state.SelectedFood,
      })
      .then((response) => response)
      .then((data) => {
        pointer.setState({ calorieLoad: 0 });
        pointer.setState({ CalorieData: data.data }, () => console.log(pointer.state.CalorieData));
      })
      .catch((error) => {
        pointer.setState({ calorieLoad: 0 });
        console.log(error);
      });
  }

  close = () => this.setState({ ModalStatus: false });

  onSubmitModal = (e) => {
    e.preventDefault();
    this.getCalorieInfo();
    this.setState({ calorieLoad: 1 });
  };

  render() {
    const Results = (result) => (
      <Segment
        onClick={() => this.onClickHandler(result.name)}
        className="results-segment"
      >
        <div>
          <Header className="result-header">
            Name:
            {result.name}
          </Header>
        </div>
        <div className="score-div">
          <Header className="result-header">
            Probability:
            {' '}
            {(result.score * 100).toFixed(2)}
            %
          </Header>
        </div>
      </Segment>
    );

    const LoaderComp = () => (
      <Dimmer active>
        <Loader content="Loading" />
      </Dimmer>
    );
    return (
      <div className="mainhome container">
        <div className="inner-home">
          {/* Starting Image Recognition */}
          <div>
            <Header className="Main_Header">Image Recognition Results</Header>
            <Header className="small_Header">(Select any result below)</Header>
            <div className="rec-div">
              <Grid columns={this.state.DataLength + 1} stackable>
                <Grid.Row>
                  {this.state.Data.map((result) => (
                    <Grid.Column key={result}>
                      <ModalParam
                        loadComp={
                          this.state.calorieLoad === 1 ? LoaderComp() : null
                        }
                        onChangeServe={(e) => this.setState({
                          NutrientAPIParamQuantity: e.target.value,
                        })}
                        onChangeSize={(e) => this.setState({
                          NutrientAPIParamSize: e.target.value,
                        })}
                        onSubmitModal={this.onSubmitModal}
                        component={Results(result)}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </div>
          </div>

          {/* Starting Nutrition */}
          <div className="nut-div">
            <Grid stackable>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Header className="Main_Header">Nutrition Results</Header>
                  <CalorieSeg
                    quantity={this.state.NutrientAPIParamQuantity}
                    name={this.state.SelectedFood}
                    weight={10}
                    objectArr={this.state.CalorieData}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header className="Main_Header">Health Labels</Header>
                  <HealthLabel
                    HealthArray={this.state.CalorieData}
                    DietArray={this.state.CalorieData}
                    CautionArray={this.state.CalorieData}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
export default withCookies(withRouter(HomeComp));
