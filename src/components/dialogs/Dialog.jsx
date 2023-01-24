import * as React from "react";

/*
  _What is a Dialog?_

  A Dialog represents an event that requires immediate user attention.
  As such the user is usually promted to respond to the event in some way or
  another.

  _Interactivity_

  A Dialog box should be promtly presented centrally on top of other elements.
  The contents behind a dialog box are usually blured so as to capture the attention
  of the user.
  A Dialog box should capture keyboard focus.
  A Dialog box must include a button that the user may use to cancel or close the Dialog.
  A Dialog box may be dismissed via the 'ESC' key.
  A Dialog box may be dismissed via a click outside the boundaries of the Dialog.
*/

function Dialog({ open, onOpenChange, children, ...props }) {
  const dialogRef = React.useRef(null);

  const handleClose = React.useCallback(({ clientX, clientY, target }) => {
    const { left, right, top, bottom } = target.getBoundingClientRect();
    // Keyboard event
    if (!clientX || !clientY) {
      onOpenChange(false);
    }
    // Pointer event
    if (
      clientY < top ||
      clientY > bottom ||
      clientX < left ||
      clientX > right
    ) {
      onOpenChange(false);
    }
  });

  React.useEffect(() => {
    open ? dialogRef.current.showModal() : dialogRef.current.close();
    return () => dialogRef.current.close();
  }, [open, onOpenChange]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      onClick={handleClose}
      autoFocus
      {...props}
    >
      {children}
    </dialog>
  );
}

export default Dialog;
export { Dialog };
