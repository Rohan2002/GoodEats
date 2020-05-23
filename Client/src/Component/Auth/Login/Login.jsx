import React from 'react';
import axios from 'axios';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './Login.css';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...',
      login: false,
      email: '',
      password: '',
      Register_Flag: -1,
    };
  }
  sendLogin = () => {
    axios
      .post('http://localhost:8080/api/authenticate', {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ Register_Flag: 1 });
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({ Register_Flag: 0 });
        }
      });
  };
  onSubmit = () => {
    this.sendLogin();
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
          content="Wrong email or password"
        />
      );
    }
    if (isLoggedIn === 1) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <>
        <div className={'main-header container'}>
          <Header className={'main-header-style'}>
            Login to <span className={'second-part'}>your account</span>
          </Header>

          <Form onSubmit={this.onSubmit}>
            <div className={'main-form container'}>
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
              Don't have an account? Register <a href="/#/register">here</a>
            </Header>
            <Button className={'form-button'} type="submit">
              Log in
            </Button>
          </Form>
          {button}
        </div>
      </>
    );
  }
}
