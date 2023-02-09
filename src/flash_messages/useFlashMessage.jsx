import * as React from "react";
import { FlashMessagePortal } from "./FlashMessagePortal";
import {
  FlashMessageInfo,
  FlashMessageSuccess,
  FlashMessageWarning,
  FlashMessageError,
  FlashMessageCustom,
} from "./FlashMessage";

/*
  USAGE:

  function SomeComponent() {
  const [getFm, createFm] = useFlashMessage();

  return (
  <div>
      <button onClick={() => {

         // pre-made flash message
         createFm({type: 'info', message='some message', timeout=20000})

         // custom flash message
         createFm(<FancyFlashMessage/>, {timeout=20000})

      }}>  some condition </button>
     {getFm()}
  </div>
  )
  }
 */

const fmToPortal = (fm = null) => <FlashMessagePortal>{fm}</FlashMessagePortal>;

function useFlashMessage() {
  const [getFm, setFm] = React.useState(() => () => fmToPortal());

  const rmFm = () => setFm(() => () => fmToPortal());

  const createFm = React.useCallback((customFm, options) => {
    options = options || customFm;
    let fm;

    switch (options?.type) {
      case "info":
        console.log("will cerate an info fm");
        fm = <FlashMessageInfo rmFm={rmFm} {...options} />;
        break;
      case "success":
        fm = <FlashMessageSuccess rmFm={rmFm} {...options} />;
        break;
      case "warning":
        fm = <FlashMessageWarning rmFm={rmFm} {...options} />;
        break;
      case "error":
        fm = <FlashMessageError rmFm={rmFm} {...options} />;
        break;
      default: // custom
        if (!React.isValidElement(customFm)) {
          throw new Error("Custom Flash Message is not a valid React Element");
        }

        fm = (
          <FlashMessageCustom rmFm={rmFm} {...options}>
            {customFm}
          </FlashMessageCustom>
        );
    }

    setFm(() => () => fmToPortal(fm));
  }, []);

  return [getFm, createFm];
}

export { useFlashMessage };
