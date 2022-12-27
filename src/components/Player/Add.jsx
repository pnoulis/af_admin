import React from 'react';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import EndAdornment from './EndAdornment';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  gap: 20px;
  flex-direction: column;
width: 300px;

button {
background-color: #d199ff;
}
`;

export function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      {' '}
      <h2>Existing Player</h2>
      <Container
        className="add-form"
        onSubmit={handleSubmit((data) =>
          alert('handle submit')
        )}
      >
        <TextField
          id="outlined-basic"
          label="User Name"
          color={errors.userName ? 'error' : 'secondary'}
          sx={{
            marginTop: '20px',
            '&.Mui-focused': { color: 'transparent' },
            '&.MuiOutlinedInput-root': { color: 'transparent' },
          }}
          InputProps={{
            endAdornment: <EndAdornment errors={errors} type="userName" />,
          }}
          variant="outlined"
          {...register('userName', { required: true })}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          color={errors.password ? 'error' : 'secondary'}
          variant="outlined"
          InputProps={{
            endAdornment: <EndAdornment errors={errors} type="password" />,
          }}
          {...register('password', { required: true })}
        />
        <Button type="submit" variant="filled">
          Submit
        </Button>
      </Container>
    </div>
  );
}

// export function Add() {
//   return (
//     <React.Fragment>
//       <p>login player</p>
//     </React.Fragment>
//   );
// }
