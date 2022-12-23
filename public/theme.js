import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#d199ff',
          width: '50%',
          margin: '0 auto',
          color: 'white',
        },
      },
      defaultProps: {
        // The props to change the default for.
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d199ff',
            },
          },
        },
      },
    },
  },
});
