import React, {useEffect, useRef} from 'react';
import twilioVideo from "twilio-video";

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
        //helper to add new participant
        const addParticipant = participant => {
          console.log("participant connected", participant.identity);
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track;
              remoteVidRef.current.appendChild(track.attach());
              console.log("attached remote vid ref");
            }
          });
          parcitipant.on("trackSubscribed", track => {
            console.log("track subscribed");
            remoteVidRef.current.appendChild(track.attach());
          });
        };

        //add new participant
        room.on("participantConnected", addParticipant);
        //for each participant, add new video and audio
        room.participants.forEach(addParticipant);
      });
  }, [token]);

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  );
};

export default Video