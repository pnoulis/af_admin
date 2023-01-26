import {useCallback} from 'react';

function useKeys(cb, keys = []) {
  const handleKey = useCallback(
    (adhoc = null) => ({
      onKeyDown(e) {
        adhoc && adhoc(e);
        keys.length > 0 ? keys.includes(e.code) && cb(e) : cb(e);
      }
    }),
    []
  );
  return handleKey;
}

export { useKeys };
