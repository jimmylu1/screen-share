import React, {Component} from 'react';
import adapter from "webrtc-adapter";
import TwilioVideo from "twilio-video";
import { getToken } from './api.js'


export default class Container extends Component {
  constructor(){
    state = {
      videoRoom: null,
      joined: false,
      userName: '',
      roomName: ''
    }
  }

  componentDidMount() {
    if (adapter.browserDetails.browser === "chrome") {
      adapter.browserShim.shimGetDisplayMedia(window, "screen");
    }
  }

  //get token for user from api
  getToken = async () => {
    const { username } = this.state;
    const res = await getToken(username);
    return res.data.token;
  }

  //join a room
  
}