import * as React from "react";
import { useMqtt } from "/src/mqtt";
import { FlashMessage } from "/src/flash_messages";
import { Modal } from "/src/modals";
import { ConfirmUnpairDialog } from "./ConfirmUnpairDialog";
import { WRISTBAND_STATUS } from "/src/app/route_registration_team";

function useScanPlayerWristband() {}

export { useScanPlayerWristband };
