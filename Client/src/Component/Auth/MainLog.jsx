import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Login from './Login/Login';
import './MainAuth.css';
import Welcome from './Welcome-Graphic/welcome';

const MainLog = () => {
  return (
    <div className={'login-contain'}>
      <Segment className={'login-segment'}>
        <Grid columns={2}>
          <Grid.Column className={'left-col'}>
            <Welcome action={'login'} />
          </Grid.Column>
          <Grid.Column>
            <Login />
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};
export default MainLog;
