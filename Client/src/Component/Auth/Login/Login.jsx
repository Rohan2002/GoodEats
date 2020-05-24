import React from 'react';
import axios from 'axios';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './Login.css';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: -1,
      showErr: false,
    };
  }
  async sendLogin() {
    const pointer = this;
    await axios
      .post('http://localhost:8080/api/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(function (res) {
        if (res.status === 200) {
          pointer.setState({ loading: 0 });
          pointer.setState({ showErr: false });
          pointer.props.history.push('/upload');
        }
      })
      .catch(function (error) {
        pointer.setState({ showErr: true });
      });
  }
  onSubmit = () => {
    this.sendLogin();
    this.setState({ loading: 1 });
  };
  render() {
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
          {this.state.showErr === true ? (
            <Message
              error
              header="Action Forbidden"
              content="Wrong email or password"
            />
          ) : null}
        </div>
      </>
    );
  }
}
export default withRouter(Login);
