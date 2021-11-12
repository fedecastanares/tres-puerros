import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ItemCart from '../components/itemCart';
import Form from '../components/Form';
import useCart from '../hooks/useCart';
import usePersonalData from '../hooks/usePersonalData';
import emptyCart from '../assets/img/carritoVacio.png';

import { useHistory } from "react-router-dom";



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
    img: {
        height: '5rem',
        width: 'auto'
    }
});

const Cart = () => {
    const classes = useStyles();
    const { cart, setCart } = useCart();
    const {data} = usePersonalData();
    const history = useHistory();

    const hasValidData = () => {return data.name === "" && data.phone === "" && data.location === ""};

    const onSubmit = () => {
        setCart([]);
        history.push("/thankyou");
    }

    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{minHeight: "90vh"}}>
                <Grid item xs={11} sm={9} md={7} >
                    <Card className={classes.root}>
                        <>
                        {cart.length > 0 ?
                            <>
                                <CardContent>
                                    <Form /><br/>
                                    <Typography variant="h5" component="h5">Productos:</Typography>
                                    {cart.map((item, index) => <ItemCart key={item._id} item={item} index={index} />)}
                                </CardContent>
                                <CardActions>
                                    <Button disabled={hasValidData()} fullWidth variant="contained" color="primary" onClick={onSubmit} style={{color:'white'}}>{hasValidData() ? "Faltan datos personales" : "Confirmar"}</Button>
                                </CardActions>
                            </>
                            :
                            <div style={{margin: "1rem 0"}}>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <img className={classes.img} src={emptyCart} alt='carrito vacio' />
                                </div>
                                <Typography align="center">Carrito vacio</Typography>
                            </div>
                        }
                        </>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Cart;