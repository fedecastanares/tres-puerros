import React, {useContext, useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/img/logo-tres-puerros.png'
import {DataContext} from '../context/dataContext'
// import {loginRequest} from '../../requests/login'
import Message from './message';
import UserService from '../services/UserService';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    padding: "1rem",
    borderRadius: 5
  },
  avatar: {
    margin: theme.spacing(1),
    maxHeight: "4rem"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginComponent() {
  const classes = useStyles();
  const User = new UserService();
  const history = useHistory();
  const {setauth, setError} = useContext(DataContext)
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    const validate = User.loginValidate(user, setError);
    if (validate) {
      const login = async (user) => {
        const successfull = await User.login(user.email.toLowerCase(), user.password);
        if (successfull){
          setauth(true);
          setError(false)
          history.push('/admin');
        } else {
          setError({severity : 'warning', message: "Usuario o contraseña invalida"})
        }
      }
      login(user);
    } else {
      setError({severity : 'warning', message: "Usuario o contraseña invalida"})
    }
  }

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
  })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} alt="logo tres puerros" className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Tres puerros
        </Typography>
        <Message/>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            type='email'
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  );
}