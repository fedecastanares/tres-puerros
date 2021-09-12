import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ItemCart from '../components/itemCart';
import useCart from '../hooks/useCart';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Cart = () => {
    const classes = useStyles();
    const { cart } = useCart();

    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item xs={11} sm={9} md={7} >
                    <Card className={classes.root}>
                        {cart.length > 0 ?
                            <>
                                <CardContent>
                                    {cart.map(item => <ItemCart item={item} />)}
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant="contained" color="primary" style={{color:'white'}}>Confirmar</Button>
                                </CardActions>
                            </>
                            :
                            <Typography>Carrito vacio</Typography>
                        }
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Cart;