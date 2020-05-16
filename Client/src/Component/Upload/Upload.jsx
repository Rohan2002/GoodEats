/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import React from 'react';
import axios from 'axios';
import {
  Progress,
  Segment,
  Header,
  Form,
  Grid,
  Icon,
  Button,
  Dimmer,
  Loader,
  Message,
} from 'semantic-ui-react';
import './Upload.css';
import { withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import CameraUpload from './camera-upload';

class Upload extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      FileSize: 0,
      Description: 'No File Selected',
      error_message: null,
      load_percent: 0,
      loading_send: -1,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    // this._isMounted && this.handleAPISend();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      Description: event.target.files[0].name,
      FileSize: event.target.files[0].size,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleAPISend();
    this.setState({ loading_send: 1 });
  };

  async handleAPISend() {
    const config = {
      onUploadProgress: (progressEvent) => this._isMounted
        && this.setState({
          load_percent: (progressEvent.loaded * 100) / progressEvent.total,
        }),
      // setTimeout(() => this._isMounted && this.setState({ load_percent: 0 }), 10000);
    };
    const formData = new FormData();
    formData.append('description', this.state.Description);
    formData.append('selectedFile', this.state.selectedFile);
    const response = await axios.post(
      'http://localhost:8080/api/uploadFile',
      formData,
      config,
    );
    try {
      const resMainData = response.data;
      this.props.cookies.set('Data', resMainData, { path: '/', maxAge: 3600 });
      this._isMounted && this.setState({ loading_send: 0 });
      this.props.history.push({
        pathname: '/',
        search: '?access=True',
      });
    } catch (error) {
      this._isMounted && this.setState({ loading_send: 0 });
      this._isMounted && this.setState({ error_message: error });
    }
  }

  render() {
    return (
      <section className="uploadmain">
        <div className="uploadseg container">
          {this.state.loading_send === 1 ? (
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          ) : null}
          {this.state.error_message != null ? (
            <Message error>
              Error:
              {' '}
              {this.state.error_message}
            </Message>
          ) : null}
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column className="col-upload">
                <Segment className="file-uploads">
                  <Form onSubmit={this.handleSubmit}>
                    <div className="col1">
                      <div className="icon-holder">
                        <Icon name="upload" size="massive" />
                      </div>
                      <div className="upload-head">
                        <Header className="upload-headder">
                          Drag and Drop file
                          <br />
                          or
                        </Header>

                        <Form.Input
                          onChange={this.onChangeHandler}
                          type="file"
                          required
                        />
                        <div className="progress-main">
                          <Header className="percent">
                            {this.state.Description}
                            {' '}
                            {this.state.FileSize / 100000}
                            Mb
                          </Header>
                          <Progress
                            percent={this.state.load_percent}
                            color="green"
                          >
                            <Header className="percent">
                              Done:
                              {' '}
                              {this.state.load_percent}
                              %
                            </Header>
                          </Progress>
                        </div>
                        <Button content="Upload" className="upload-button" />
                      </div>
                    </div>
                  </Form>
                </Segment>
              </Grid.Column>

              <Grid.Column className="col-upload">
                <CameraUpload />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </section>
    );
  }
}
export default withCookies(withRouter(Upload));
