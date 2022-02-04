import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { ThemeProvider as ThemeProvider2, createTheme as createTheme2 } from '@mui/material/styles';


const Palette = ({ children }) => {

  const theme = createTheme({
    type: 'dark',
    palette: {
      primary: {
        main: '#6fc24d',
      },
      secondary: {
        main: '#ec1d25',
      },
      warning: {
        main: "#ff9a04"
      },
      orange: "#ff9a04"
    },
  });

  const theme2 = createTheme2({
    type: 'dark',
    palette: {
      primary: {
        main: '#6fc24d',
      },
      secondary: {
        main: '#ec1d25',
      },
      warning: {
        main: "#ff9a04"
      },
      orange: "#ff9a04"
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ThemeProvider2 theme={theme2}>
          {children}
        </ThemeProvider2>
      </ThemeProvider>
    </>
  );
}

export default Palette;