import { AppBar, Toolbar, Typography, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import TresPuerrosIMG from '../assets/img/logo-tres-puerros.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid container justifyContent='center'>
                        <Grid item xs={11} sm={9}  md={7}>
                            <Grid container alignItems='center' justifyContent='space-between'>
                                <Grid item>
                                    <Grid container>
                                        <img className={classes.logoTresPuerros} src={TresPuerrosIMG} alt='logo tres puerros' />
                                        <Typography variant="h6" className={classes.title}>
                                            Tres puerros
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                    >
                                        <ShoppingCartIcon className={classes.icon} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;