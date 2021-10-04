import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import useCart from "../hooks/useCart";


const useStyles = makeStyles((theme) => ({
    title: {
        margin: '0.5rem 0',
    },
    subtitle: {
        fontSize: "1rem",
        fontWeight: 500
    },
    text: {
        margin: "0.2rem 0"
    },
    product: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    }
}));

const ItemCart = ({ item, index }) => {
    const classes = useStyles();
    const {cart, setCart} = useCart();
    const handleClick = () => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    return (
        <>
            {item.hasOwnProperty("items") ?
                <Grid container className={classes.product} alignItems="center" justifyContent="space-between">
                    <Grid item xs={10} style={{ border: "1px solid black", paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                        <div style={{ borderBottom: "1px solid black", borderBottomWidth: 1 }}>
                            <Typography className={classes.title} variant="h5" component="h5">{item.name} ${item.price}</Typography>
                        </div>
                        <div style={{ margin: "0.5rem 0" }}>
                            <Typography className={classes.subtitle} variant="h5" component="h5">Items:</Typography>
                            {item.items.map(itemV => itemV.active && <Typography variant="body1" component="p">• {itemV.name}</Typography>)}
                            <br />
                            <Typography className={classes.subtitle} variant="h5" component="h5">Agregados:</Typography>
                            {item.aggregates.map(itemV => <Typography className={classes.text} variant="body1" component="p">• {itemV.product}</Typography>)}
                        </div>
                    </Grid>
                    <IconButton color='secondary' size='medium' onClick={() => handleClick(index)}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                :
                <>
                    <Grid container className={classes.product} alignItems="center" justifyContent="space-between">
                        <Typography className={classes.text} variant="body1" component="p">• {`${item.name} $ ${item.price} - ${item.units > 0 ? item.units + " unidades" : ""}  ${item.kg > 0 ? item.kg + " kgs" : ""}`}</Typography>
                        <IconButton color='secondary' size='medium' onClick={() => handleClick(index)}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </>}
        </>
    );
}

export default ItemCart;