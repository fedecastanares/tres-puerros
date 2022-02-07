import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import Users from "../services/UserService";

import { Grid, Card, Typography, CardContent, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PrintIcon from '@material-ui/icons/Print';
import ItemCart from "../components/itemCart";
import { useHistory } from "react-router-dom";
import useCart from '../hooks/useCart'

import TresPuerrosIMG from '../assets/img/logo-tres-puerros.png'

const useStyles = makeStyles((theme) => ({
    logoTresPuerros: {
        maxHeight: '2rem',
        width: "auto"
    },
    logoContainer: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.4rem",
        color: "#fff",
        marginBottom: '0.75rem',
        padding: '0.25rem'
    }
}));

const Order = ({ match }) => {
    const classes = useStyles();
    const history = useHistory();
    const [order, setOrder] = useState(null);
    const { setCart } = useCart();
    const printRef = useRef(null);

    useEffect(() => {
        const _usersService = new Users();
        setCart([])
        const getOrder = async () => {
            const response = await _usersService.getOrderById(match.params.id)
            setOrder(response.order)
        }
        getOrder()
    }, [match.params.id, setCart])

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });


    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{ minHeight: "90vh" }}>
                <Grid item xs={11} sm={9} md={7} >
                    <Card>
                        <Grid container justifyContent="space-between">
                            <IconButton color="primary" size='medium' onClick={() => history.goBack()} >
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton color="inherit" size='medium' onClick={() => printRef !== null && handlePrint()} >
                                <PrintIcon />
                            </IconButton>
                        </Grid>
                        <>
                            {order !== null ?
                                <>
                                    <CardContent ref={printRef}>
                                        <Grid container className={classes.logoContainer}>
                                            <img className={classes.logoTresPuerros} src={TresPuerrosIMG} alt='logo tres puerros' />
                                            <Typography variant="h6" className={classes.title}>
                                                Tres puerros
                                            </Typography>
                                        </Grid>
                                        <Typography variant="body1" component="p" style={{fontSize: '0.75rem'}}>ID: {order._id}</Typography>
                                        <br />
                                        <Typography variant="h5" component="h5">{order.personalData.name}</Typography>
                                        <Typography variant="body1" component="p">Direccion: {order.personalData.location}</Typography>
                                        <Typography variant="body1" component="p">Telefono: {order.personalData.phone}</Typography>
                                        <Typography variant="body1" component="p">Zona: {order.personalData.zone}</Typography>
                                        <Typography variant="body1" component="p">Dia: {order.personalData.day}</Typography>
                                        <Typography variant="body1" component="p">Medio de pago: {order.personalData.paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}</Typography>
                                        <br />
                                        <Typography variant="body2" component="p">Aclaraciones:<br /> {order.personalData.aclaraciones}</Typography>
                                        <br />
                                        <Typography variant="h5" component="h5">Productos:</Typography>
                                        {order.cart.map((item, index) => <ItemCart key={item._id} item={item} index={index} />)}
                                        <Typography variant="h5" component="h3" align='right' style={{margin: "1rem 10rem"}}>Total:</Typography>
                                    </CardContent>
                                </>
                                :
                                <div style={{ margin: "1rem 0" }}>
                                    <Typography align="center">Cargando</Typography>
                                </div>
                            }
                        </>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Order;