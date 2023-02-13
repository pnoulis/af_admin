import * as React from "react";

function FlashMessageBase({ rmFm, timeout = 5000, className, children }) {
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      rmFm();
    }, timeout);
    return () => clearTimeout(timeoutId);
  }, []);
  return <article className={className}>{children}</article>;
}

export { FlashMessageBase };
