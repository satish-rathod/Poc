import AgoraRTC from "agora-rtc-sdk-ng";
import config from "./config.json";

let channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a local video track.
  localVideoTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold a remote video track.
  remoteVideoTrack: null,
  // A variable to hold the remote user id.s
  remoteUid: null,
};

const AgoraRTCManager = async (eventsCallback) => {
  let agoraEngine = null;
  // Setup done in later steps
};

// Only valid when the channel profile is set to "live"
const setUserRole = (role) => {
  if(role == "audience")
  {
      // An audience can only receive audio or video
      // AUDIENCE_LEVEL_ULTRA_LOW_LATENCY takes effect only when the user role is "audience".
      agoraEngine.setClientRole(role, AudienceLatencyLevelType.AUDIENCE_LEVEL_ULTRA_LOW_LATENCY);
  }
  else
  {
      // A host can send and receive audio or video
      agoraEngine.setClientRole(role, null);
  }
}

const AgoraRTCManager = (eventsCallback) => {
  let agoraEngine = null;

  // Set up the signaling engine with the provided App ID, UID, and configuration
  const setupAgoraEngine = () => {
      agoraEngine = AgoraRTC.createClient({ mode: "live", codec: "vp9" });
  };

  setupAgoraEngine();

  const getAgoraEngine = () => {
      return agoraEngine;
  };
};

const join = async (localPlayerContainer, channelParameters) => {
  await agoraEngine.join(
    config.appId,
    config.channelName,
    config.token,
    config.uid
  );
  // Create a local audio track from the audio sampled by a microphone.
  channelParameters.localAudioTrack =
  await AgoraRTC.createMicrophoneAudioTrack();
  // Create a local video track from the video captured by a camera.
  channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  // Append the local video container to the page body.
  document.body.append(localPlayerContainer);
  // Publish the local audio and video tracks in the channel.
  await getAgoraEngine().publish([
    channelParameters.localAudioTrack,
    channelParameters.localVideoTrack,
  ]);
  // Play the local video track.
  channelParameters.localVideoTrack.play(localPlayerContainer);
};

// Event Listeners
agoraEngine.on("user-published", async (user, mediaType) => {
  // Subscribe to the remote user when the SDK triggers the "user-published" event.
  await agoraEngine.subscribe(user, mediaType);
  console.log("subscribe success");
  eventsCallback("user-published", user, mediaType)
});

// Listen for the "user-unpublished" event.
agoraEngine.on("user-unpublished", (user) => {
  console.log(user.uid + "has left the channel");
});

const handleVSDKEvents = (eventName, ...args) => {
  switch (eventName) {
  case "user-published":
      if (args[1] == "video") {
        // Retrieve the remote video track.
        channelParameters.remoteVideoTrack = args[0].videoTrack;
        // Retrieve the remote audio track.
        channelParameters.remoteAudioTrack = args[0].audioTrack;
        // Save the remote user id for reuse.
        channelParameters.remoteUid = args[0].uid.toString();
        // Specify the ID of the DIV container. You can use the uid of the remote user.
        remotePlayerContainer.id = args[0].uid.toString();
        channelParameters.remoteUid = args[0].uid.toString();
        remotePlayerContainer.textContent =
            "Remote user " + args[0].uid.toString();
        // Append the remote container to the page body.
        document.body.append(remotePlayerContainer);
        // Play the remote video track.
        channelParameters.remoteVideoTrack.play(remotePlayerContainer);
      }
      // Subscribe and play the remote audio track If the remote user publishes the audio track only.
      if (args[1] == "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = args[0].audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        channelParameters.remoteAudioTrack.play();
      }
  }
};

const leave = async (channelParameters) => {
  // Destroy the local audio and video tracks.
  channelParameters.localAudioTrack.close();
  channelParameters.localVideoTrack.close();
  // Remove the containers you created for the local video and remote video.
  await agoraEngine.leave();
};

