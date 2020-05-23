import React from 'react';
import axios from 'axios';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './Register.css';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...',
      email: '',
      password: '',
      Register_Flag: -1,
    };
  }
  sendRegister = () => {
    const pointer = this;
    axios
      .post('http://localhost:8080/api/register', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(function (res) {
        if (res.status === 200) {
          pointer.setState({ Register_Flag: 1 });
        }
      })
      .catch((error) => {
        if (error) {
          pointer.setState({ Register_Flag: 0 });
        }
      });
  };
  onSubmit = () => {
    this.sendRegister();
  };

  render() {
    const isLoggedIn = this.state.Register_Flag;
    console.log(isLoggedIn);
    let button;
    if (isLoggedIn === 0) {
      button = (
        <Message
          error
          header="Action Forbidden"
          content="You can only sign up for an account once with a given email."
        />
      );
    }
    if (isLoggedIn === 1) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div className={'main-header'}>
        <Header className={'main-header-style'}>
          Sign up for <span className={'second-part'}>new account</span>
        </Header>

        <Form onSubmit={this.onSubmit}>
          <div className={'main-form'}>
            <Form.Input
              onChange={(e) => this.setState({ email: e.target.value })}
              label="Enter Email"
              type="email"
              required
            />
            <Form.Input
              onChange={(e) => this.setState({ password: e.target.value })}
              label="Enter Password"
              type="password"
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
        {button}
      </div>
    );
  }
}
