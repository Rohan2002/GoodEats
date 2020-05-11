import React from "react";
import axios from "axios";
import {
  Progress,
  Segment,
  Header,
  Form,
  Grid,
  Icon,
  Button,
  Dimmer, Loader
} from "semantic-ui-react";
import "./Upload.css";
import { withRouter } from "react-router-dom";
import CameraUpload from './camera-upload';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';  
class Upload extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      selectedFile: null,
      FileSize: 0,
      Description: "No File Selected",
      error_message: null,
      load_percent: 0,
      screenshot: null,
      loading_send: -1,
      Data_recieved: {},
    };
    
  }
  
  componentDidMount(){
    this._isMounted = true;
    // this._isMounted && this.handleAPISend();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onChangeHandler = (event) => {
    this.setState(
      {
        selectedFile: event.target.files[0],
        Description: event.target.files[0].name,
        FileSize: event.target.files[0].size,
      },
      () => {
        console.log(this.state.selectedFile, "updated state value");
      }
    );
  };

  async handleAPISend() {
    const config = {
      onUploadProgress: (progressEvent) => {
        this._isMounted && this.setState({
          load_percent: (progressEvent.loaded * 100) / progressEvent.total,
        });
        // setTimeout(() => this._isMounted && this.setState({ load_percent: 0 }), 10000);
      },
    };
    let formData = new FormData();
    formData.append("description", this.state.Description);
    formData.append("selectedFile", this.state.selectedFile);
    const response = await axios.post("http://localhost:8080/api/uploadFile", formData, config);
    try{
      const resMain_data = response.data;
      this.props.cookies.set('Data', resMain_data, { path: '/', maxAge:3600 });
      this._isMounted && this.setState({ loading_send: 0 });
      this.props.history.push({
        pathname: "/",
        search: `?access=True`
      });
      
    }
    catch(error){
      this._isMounted && this.setState({ loading_send: 0 });
      this._isMounted && this.setState({error_message: error});
    }
  };
  handleSubmit =(event) => {
    event.preventDefault();
    this.handleAPISend();
    this.setState({ loading_send: 1 });
    
  };
  render() {
    return (
      <section className={"uploadmain"}>
        <div className={"uploadseg container"}>
          {this.state.loading_send === 1 ? <Dimmer active><Loader>Loading</Loader></Dimmer> : null}
          <Grid stackable={true}>
            <Grid.Row columns={2}>
              <Grid.Column className={"col-upload"}>
                <Segment className={"file-uploads"}>
                  <Form onSubmit={this.handleSubmit}>
                    <div className={"col1"}>
                      <div className={"icon-holder"}>
                        <Icon name="upload" size="massive"></Icon>
                      </div>
                      <div className={"upload-head"}>
                        <Header className={"upload-headder"}>
                          Drag and Drop file
                          <br />
                          or
                        </Header>

                        <Form.Input
                          onChange={this.onChangeHandler}
                          type="file"
                          required
                        />
                        <div className={"progress-main"}>
                          <Header className={"percent"}>
                            {this.state.Description} &nbsp;{" "}
                            {this.state.FileSize / 100000}Mb
                          </Header>
                          <Progress
                            percent={this.state.load_percent}
                            color="green"
                          >
                            <Header className={"percent"}>
                              Done: {this.state.load_percent}%
                            </Header>
                          </Progress>
                        </div>
                        <Button
                          content="Upload"
                          className={"upload-button"}
                        ></Button>
                      </div>
                    </div>
                  </Form>
                </Segment>
              </Grid.Column>

              <Grid.Column className={"col-upload"}>
                <CameraUpload/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </section>
    );
  }
}
export default withCookies(withRouter(Upload));
