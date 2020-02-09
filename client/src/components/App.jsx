import React, { Component } from 'react';
import {Button} from '../styled-components/Styled_components.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Share your screen :D</h1>
          
        </div>
        <Button>Leave Room</Button>
        <Button>Stop Sharing</Button>
      </div>
    );
  }
}

