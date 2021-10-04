import React from 'react';
import {Typography, Link, Box} from '@material-ui/core'

const Copyright = () => {
    return ( 
    <Box mt={8} style={{backgroundColor: "white", padding: "0.25rem 0"}}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Desarrollado por '}
        <Link color="inherit" href="https://www.federicocastanares.com.uy">
          Federico Castañares
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
    );
}
 
export default Copyright;