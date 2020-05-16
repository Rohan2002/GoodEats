import Webcam from 'react-webcam';
import React, { useState } from 'react';
import {
  Button,
  Image,
  Modal,
  Form,
  Segment,
  Icon,
  Header,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import './Upload.css';

const CameraUpload = () => {
  const [load, setLoad] = useState(-1);
  const [screenshot, setscreenshot] = useState(null);
  const [, setCookie] = useCookies(['Data']);
  const history = useHistory();

  async function sendScreenShot(data) {
    const response = await axios.post(
      'http://localhost:8080/api/uploadCamera',
      { Data: data },
    );
    console.log(response);
    try {
      const resData = response.data;
      setCookie('Data', resData, { path: '/', maxAge: 3600 }); // set cookie
      setLoad(0); // set load to 0
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  // Onclick handler for sending pic to the backend

  const WebcamCapture = () => {
    const onSubmitHandler = (event) => {
      event.preventDefault();
      sendScreenShot(screenshot);
      setLoad(1);
    };
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setscreenshot(imageSrc); // Set Screenshot data to state
    }, [webcamRef]);
    if (screenshot == null) {
      return (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            className="webcam"
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'user' }}
          />
          <div className="cap-contain">
            {screenshot}
            <Button
              className="Capture"
              onClick={capture}
              setscreenshot={screenshot}
            >
              Capture photo
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        <Form onSubmit={onSubmitHandler}>
          <Image src={screenshot} />
          <div className="main-retake-div">
            <div className="retake-div">
              <Button
                onClick={() => {
                  setscreenshot();
                }}
                className="Capture"
              >
                Retake
              </Button>
            </div>
            <div className="retake-div">
              <Button className="Capture" type="submit">
                Upload
              </Button>
            </div>
          </div>
        </Form>
      </>
    );
  };

  return (
    <Segment className="file-uploads">
      <div className="col1">
        <div className="icon-holder">
          <Icon name="camera" size="massive" />
        </div>
        <div className="upload-head">
          <Header className="upload-headder">
            Take a Picture
            <br />
            Here
          </Header>
          <Modal
            trigger={<Button className="open-cam">Camera Access</Button>}
          >
            {load === 1 ? (
              <Dimmer active>
                <Loader>Loading</Loader>
              </Dimmer>
            ) : null}
            <Modal.Header>Take a Picture</Modal.Header>
            <Modal.Content>
              <WebcamCapture />
            </Modal.Content>
          </Modal>
        </div>
      </div>
    </Segment>
  );
};
export default CameraUpload;
