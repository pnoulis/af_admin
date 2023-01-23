import * as React from "react";
import { FlashMessagesStore } from "/src/stores";
import {
  ErrorFlashMessage,
  WarningFlashMessage,
  InfoFlashMessage,
  SuccessFlashMessage,
  CustomFlashMessage,
} from "/src/app/flashMessages";

function useFlashMessages() {
  const { setFlashMessages } = FlashMessagesStore.use();

  // @param type {object || jsxElement }
  // @param message {string | number}
  // @param timeout { number || null}
  return (type, message, timeout) => {
    const fmId = Math.random().toString(36).slice(2, 7);
    switch (type) {
      case "error":
        return setFlashMessages((fms) => [
          ...fms,
          () => (
            <ErrorFlashMessage message={message} timeout={timeout} id={fmId} />
          ),
        ]);
      case "warning":
        return setFlashMessages((fms) => [
          ...fms,
          () => (
            <WarningFlashMessage
              message={message}
              timeout={timeout}
              id={fmId}
            />
          ),
        ]);
      case "info":
        return setFlashMessages((fms) => [
          ...fms,
          () => (
            <InfoFlashMessage message={message} timeout={timeout} id={fmId} />
          ),
        ]);
      case "success":
        return setFlashMessages((fms) => [
          ...fms,
          () => (
            <SuccessFlashMessage
              message={message}
              timeout={timeout}
              id={fmId}
            />
          ),
        ]);
      default:
        if (React.isValidElement(type)) {
          return setFlashMessages((fms) => [
            ...fms,
            () => (
              <CustomFlashMessage timeout={message} id={fmId}>
                {type}
              </CustomFlashMessage>
            ),
          ]);
        } else {
          throw new Error(`Undefined flash message type:${type}`);
        }
    }
  };
}

export { useFlashMessages };
