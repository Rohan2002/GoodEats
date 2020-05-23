import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Register from './Register/Register';
import './MainAuth.css';
import Welcome from './Welcome-Graphic/welcome';

const MainLog = () => {
  return (
    <div className={'login-contain'}>
      <Segment className={'login-segment'}>
        <Grid columns={2}>
          <Grid.Column className={'left-col'}>
            <Welcome action={'register'} />
          </Grid.Column>
          <Grid.Column>
            <Register />
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};
export default MainLog;
