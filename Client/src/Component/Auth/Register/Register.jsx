import React from 'react';
import axios from 'axios';
import {
  Header,
  Form,
  Button,
  Message,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...',
      email: '',
      password: '',
      age: 0,
      weight: 0,
      height: 0,
      loader: -1,
      showErr: false,
    };
  }
  handleKgToP = (kg) => (kg * 2.20462).toFixed(2);
  handlePtoKg = (p) => (p / 2.20462).toFixed(2);
  async sendRegister() {
    const pointer = this;
    await axios
      .post('http://localhost:8080/api/register', {
        email: this.state.email,
        password: this.state.password,
        age: this.state.age,
        height: this.state.height,
        weight: this.state.weight,
      })
      .then(function (res) {
        if (res.status === 200) {
          pointer.setState({ loading: 0 });
          pointer.setState({ showErr: false });
          pointer.props.history.push('/login');
        }
      })
      .catch(function (error) {
        pointer.setState({ showErr: true });
      });
  }
  onSubmit = () => {
    this.sendRegister();
    this.setState({ loading: 1 });
  };
  render() {
    console.log(this.state.showErr);
    return (
      <div className={'main-header'}>
        {this.state.loader == 0 ? (
          <Dimmer active>
            {' '}
            <Loader />{' '}
          </Dimmer>
        ) : null}
        <Header className={'main-header-style'}>
          Sign up for <span className={'second-part'}>new account</span>
        </Header>

        <Form onSubmit={this.onSubmit}>
          <div className={'main-form'}>
            <Form.Input
              onChange={(e) => this.setState({ email: e.target.value })}
              label="Email"
              type="email"
              autoComplete="on"
              required
            />
            <Form.Input
              onChange={(e) => this.setState({ age: e.target.value })}
              label="Age"
              type="number"
              autoComplete="on"
              required
            />
            <Form.Input
              onChange={(e) => this.setState({ weight: e.target.value })}
              label="Weight Pounds"
              type="number"
              autoComplete="on"
              required
            ></Form.Input>
            <Form.Input
              onChange={(e) => this.setState({ height: e.target.value })}
              label="Height Centimeters"
              type="number"
              autoComplete="on"
              required
            ></Form.Input>
            <Form.Input
              onChange={(e) => this.setState({ password: e.target.value })}
              label="Password (8 Characters)"
              type="password"
              minLength="8"
              autoComplete="on"
              required
            />
          </div>
          <Header className={'sign-in'}>
            Already have an account? Sign in <a href="/#/login">here</a>
          </Header>
          <Button className={'form-button'} type="submit">
            Register
          </Button>
        </Form>
        {this.state.showErr === true ? (
          <Message
            error
            header="Action Forbidden"
            content="You can only sign up for an account once with the given email."
          />
        ) : null}
      </div>
    );
  }
}
export default withRouter(Register);
