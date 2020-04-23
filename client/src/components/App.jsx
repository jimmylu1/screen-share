import React, { Component, useState } from "react";
import { Button } from "../styled-components/Styled_components.jsx";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";

const StartForm = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios({
      method: "POST",
      url: "https://pistachio-markhor-9452.twil.io/generate-token",
      data: {
        identity: name
      }
    });
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Display Name: <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="room">
        Room to Join: <br />
        <input
          type="text"
          id="room"
          name="room"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Join Video Chat</button>
    </form>
  );
};

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Share your screen :D</h1>
        </div>
        <Button>Leave Room</Button>
        <Button>Stop Sharing</Button>
        <StartForm />
      </div>
    );
  }
}

/*
TO DO:

1. show local video
2. connect to room (remove)
3. show participant video on screen (remove)
4. handle events
*/
