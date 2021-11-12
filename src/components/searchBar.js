import React, { useContext, useState } from 'react';
import { DataContext } from '../context/dataContext';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        marginBottom: '2vh',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.primary.main, 0.85),
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, 1),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#fff",
      },
      inputRoot: {
        color: '#fff',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
}))

const SearchBar = () => {
    const classes = useStyles();
    const { users, setRenderUsers } = useContext(DataContext);
    const [ input, setInput ] = useState('');

    const handleChange = e => {
        e.preventDefault();
        setInput(e.target.value);
        if (e.target.value === '' ){
            //setRenderUsers(users);
        } else {
            //const usersToRender = users.filter(user => user.name.startsWith(input)  || user.surname.startsWith(input) );
            // setRenderUsers(usersToRender);
        }
    }

    return ( 
        <>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Filtrar..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
              value={input}
              onChange={handleChange}
            />
          </div>
        </>
     );
}
 
export default SearchBar;