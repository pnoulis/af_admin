import * as React from "react";
import { useMqtt } from "/src/mqtt";
import { FlashMessage } from "/src/flash_messages";

function useUnpairPlayerWristband(state, setState) {
  if (state == null || setState == null) {
    throw new Error("Null state to usePairPlayerWristband middleware");
  }
}
