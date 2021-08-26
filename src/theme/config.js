import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';


const Palette = ({children}) => {

    const theme = createTheme({
        type: 'dark',
        palette: {
          primary: {
            main: '#6fc24d',
          },
          secondary: {
            main: '#ec1d25',
          },
          orange: "#ff9a04"
        },
      });

    return ( 
        <>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
        </>
     );
}
 
export default Palette;