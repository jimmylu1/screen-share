import React, { Component } from "react";
import adapter from "webrtc-adapter";
import TwilioVideo from "twilio-video";
import { getToken } from "./api.js";

export default class Container extends Component {
  constructor() {
    state = {
      videoRoom: null,
      joined: false,
      username: "",
      roomName: ""
    };
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
  };

  //join a room
  joinRoom = async () => {
    const { roomName } = this.state;
    //update joined state to true
    this.setState({ joined: true });

    try {
      const token = await this.getToken();

      //get local video stream
      const localVideoTrack = await TwilioVideo.createLocalVideoTrack();
      this.setState({ localVideoTrack });

      //get local audo stream
      const localAudioTrack = await TwilioVideo.createLocalAudioTrack();
      this.setState({ localAudioTrack });

      //new video room with generated token
      const videoRoom = await TwilioVideo.connect(token, {
        name: roomName,
        tracks: [localVideoTrack, localAudioTrack],
        insights: false
      });
      //if disconnected, stop video, audio, screen share
      videoRoom.on("disconnected", () => {
        this.stopVideoTrack();
        this.stopAudioTrack();
        this.stopScreenTrack();

        this.setState({
          videoRoom: null
        });
      });
      this.setState({ videoRoom });
    } catch (err) {
      this.stopVideoTrack();
      this.stopAudioTrack();
    }
    this.setState({ joined: false });
  };
}
