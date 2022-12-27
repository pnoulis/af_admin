import React from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';

const EndAdornment = ({ errors, type }) => {
  return (
      <div>
      {errors[type] && (
          <InputAdornment position="end">
          <div style={{ color: 'red', marginRight: '5px', fontSize: '0.7em' }}>
          Required
        </div>
          <ErrorOutline color="error" />
          </InputAdornment>
      )}
    </div>
  );
};

export default EndAdornment;
