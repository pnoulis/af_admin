import * as React from 'react';

function FlashMessageBase({ className, children }) {
  return <article className={className}>{children}</article>;
}

export { FlashMessageBase };
