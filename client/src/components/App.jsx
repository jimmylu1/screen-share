import React, { useState, useEffect, useRef } from "react";
import { Button } from "../styled-components/Styled_components.jsx";
import StartForm from "./StartForm.jsx";
import twilioVideo from "twilio-video";

//move to own component
const Video = ({ token }) => {
  const localVidRef = useRef();
  const remoteVidRef = useRef();
  useEffect(() => {
    twilioVideo
      .connect(token, { video: true, audio: true, name: "test" })
      .then(room => {
        //attach local video
        twilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach());
        });
        console.log("successfully joined room");
        console.log(room);

        const addParticipant = participant => {
          console.log('participant connected', participant.identity)
            participant.tracks.forEach(publication => {
              if (publication.isSubscribed) {
                const track = publication.track;
                remoteVidRef.current.appendChild(track.attach());
              }
            });
        };
        
        //attach remote video
        room.on("participantConnected", addParticipant)
        room.participants.forEach(addParticipant) 
        }
      )
  }, [token]);

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(false);
  return (
    <div>
      <div>
        <h1>Share your screen :D</h1>
      </div>
      <Button>Leave Room</Button>
      <Button>Stop Sharing</Button>
      {!token ? <StartForm storeToken={setToken} /> : <Video token={token} />}
    </div>
  );
};

export default App;

/*
TO DO:

1. show local video
2. connect to room (remove)
3. show participant video on screen (remove)
4. handle events
*/
