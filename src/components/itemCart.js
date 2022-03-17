import { Typography, Grid, IconButton } from '@mui/material';
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
    const { cart, setCart } = useCart();
    const handleClick = () => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    console.log(item)

    return (
        <>
            {item.hasOwnProperty("items") && item.items.length > 0 ?
                <Grid container className={classes.product} alignItems="center" justifyContent="space-between">
                    <Grid item xs={10} style={{ border: "1px solid black", paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                        <div style={{ borderBottom: "1px solid black", borderBottomWidth: 1 }}>
                            <Typography className={classes.title} variant="h5" component="h5">{item.name} ${item.price}</Typography>
                        </div>
                        <div style={{ margin: "0.5rem 0" }}>
                            <Typography className={classes.subtitle} variant="h5" component="h5">Items:</Typography>
                            {item.items.map(itemV => itemV.active &&
                                <Grid container justifyContent={"space-between"}>
                                    <Typography key={itemV._id} variant="body1" component="p">• {itemV.name}</Typography>
                                    <Typography key={itemV._id} variant="body1" component="p">{itemV.hasOwnProperty("units") && itemV.units !== "" ? `${itemV.units} unidades` : `${itemV.kg} Kg`}</Typography>
                                </Grid>
                            )}
                            <br />
                            {item.aggregates.length > 0 &&
                                <Typography className={classes.subtitle} variant="h5" component="h5">Agregados:</Typography>
                            }
                            {item.aggregates.map(itemV => itemV !== null && 
                                <Grid container justifyContent={"space-between"}>
                                    <Typography key={itemV._id} className={classes.text} variant="body1" component="p">• {itemV.name}</Typography>
                                    <Typography key={itemV._id} variant="body1" component="p">{itemV.hasOwnProperty("units") && itemV.units !== "" ? `${itemV.units} unidades` : `${itemV.kg} Kg`}</Typography>
                                </Grid>
                            )}
                            {item.aggregates.length > 0 &&
                                <Typography className={classes.subtitle} variant="h5" component="h5">Cambiados:</Typography>
                            }
                            {item.items.map(itemV => !itemV.active &&
                                <Grid container justifyContent={"space-between"}>
                                    <Typography key={itemV._id} variant="body1" component="p" style={{ textDecoration: "line-through" }}>• {itemV.name}</Typography>
                                    <Typography key={itemV._id} variant="body1" component="p" style={{ textDecoration: "line-through" }}
                                    >{itemV.hasOwnProperty("units") && itemV.units !== "" ? `${itemV.units} unidades` : `${itemV.kg} Kg`}</Typography>
                                </Grid>
                            )}
                        </div>
                    </Grid>
                    {cart.length > 0 &&
                        <IconButton color='secondary' size='medium' onClick={() => handleClick(index)}>
                            <CloseIcon />
                        </IconButton>
                    }
                </Grid>
                :
                <>
                    <Grid container className={classes.product} alignItems="center" justifyContent="space-between">
                        <Grid item xs={11}>
                            {
                                item.hasOwnProperty("kg") && item.kg > 0 ?
                                    <>
                                        <Typography className={classes.text} variant="body1" component="p">• {`${item.kg} Kg de ${item.name} a $ ${item.price} el Kg `}</Typography>
                                    </>
                                    :
                                    <>
                                        <Typography className={classes.text} variant="body1" component="p">• {`${item.units} unidades de ${item.name} vendido por ${item.package} a $ ${item.price} c/u`}</Typography>
                                    </>
                            }
                        </Grid>
                        <Grid item xs={1}>
                            {cart.length > 0 &&
                                <IconButton color='secondary' size='medium' onClick={() => handleClick(index)}>
                                    <CloseIcon />
                                </IconButton>
                            }
                        </Grid>
                    </Grid>
                </>}
        </>
    );
}

export default ItemCart;