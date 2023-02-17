function useStopPairingPlayerWristband(state, setState) {
  if (state == null || setState == null) {
    throw new Error("Null state to useStopPairingPlayerWristband");
  }

  const handleStopPairingPlayerWristband = (player) => {
    setState({ type: "stop_pairing_wristband", player });
  };

  return handleStopPairingPlayerWristband;
}

export { useStopPairingPlayerWristband };
