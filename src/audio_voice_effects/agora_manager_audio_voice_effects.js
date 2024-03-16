import AgoraManager from "../agora_manager/agora_manager.js";
import AgoraRTC from "agora-rtc-sdk-ng";

const AgoraManagerAudioVoice = async (eventsCallback, product) => {
  // Extend the AgoraManager by importing it
  const agoraManager = await AgoraManager(eventsCallback, product);

  const stopProcessAudioBuffer = async (audioFileTrack, channelParameters) => {
    // To stop audio mixing, stop processing the audio data.
    audioFileTrack.stopProcessAudioBuffer();
    // Replace audioFileTrack with localAudioTrack
    channelParameters.localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();
    agoraManager.getAgoraEngine().publish([channelParameters.localAudioTrack]);
  };

  const startProcessAudioBuffer = async (audioFileTrack, channelParameters) => {
    // Start processing the audio data from the audio file.
    audioFileTrack.startProcessAudioBuffer();
    // Call replaceTrack with stopOldTrack set to false to publish audioFileTrack and localAudioTrack together.
    console.log("channelParams", channelParameters);
    channelParameters.localAudioTrack = audioFileTrack;
    agoraManager.getAgoraEngine().publish([channelParameters.localAudioTrack]);
  };

  const createAudioFileTrack = async (file) => {
    // Create an audio file track.
    const audioFileTrack = await AgoraRTC.createBufferSourceAudioTrack({
      source: file,
    });
    console.log("audioFileTrack", audioFileTrack);
    return audioFileTrack;
  };

  // Return the extended agora manager
  return {
    ...agoraManager,
    createAudioFileTrack,
    stopProcessAudioBuffer,
    startProcessAudioBuffer,
  };
};

export default AgoraManagerAudioVoice;
