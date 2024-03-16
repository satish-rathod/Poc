import AgoraManager from "../agora_manager/agora_manager.js";

const AgoraGetStarted = async (eventsCallback, product) => {
  // Extend the AgoraManager by importing it
  const agoraManager = await AgoraManager(eventsCallback, product);

  // Return the extended agora manager
  return {
    ...agoraManager,
  };
};

export default AgoraGetStarted;
