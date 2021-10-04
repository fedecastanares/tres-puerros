import { AppBar, Toolbar, Typography, IconButton, Grid, Badge } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon  from '@material-ui/icons/AccountCircle';

import TresPuerrosIMG from '../assets/img/logo-tres-puerros.png'

import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: '5rem',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: '1rem',
        color: theme.palette.common.white
    },
    logoTresPuerros: {
        maxHeight: '2rem',
        width: "auto"
    },
    icon: {
        color: theme.palette.common.white
    }
}));

const Header = () => {

    const classes = useStyles();
    const { cart } = useCart();

    return (
        <>
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container justifyContent='center'>
                        <Grid item xs={11} sm={9}  md={7}>
                            <Grid container alignItems='center' justifyContent='space-between'>
                                <Grid item>
                                    <Link to='/' style={{textDecoration: 'none',color: 'inherit'}}>
                                        <Grid container>
                                            <img className={classes.logoTresPuerros} src={TresPuerrosIMG} alt='logo tres puerros' />
                                            <Typography variant="h6" className={classes.title}>
                                                Tres puerros
                                            </Typography>
                                        </Grid>
                                    </Link>
                                </Grid>
                                <Grid item>
                                <Link to='/admin'>
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                        >
                                            <AccountCircleIcon className={classes.icon} />
                                        </IconButton>
                                    </Link>
                                    <Link to='/carrito'>
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                        >   <Badge color="secondary" badgeContent={cart.length}>
                                                <ShoppingCartIcon className={classes.icon} />
                                            </Badge>
                                        </IconButton>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
        </>
    );
}

export default Header;