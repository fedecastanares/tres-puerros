import { useEffect, useState } from "react";
import Users from "../services/UserService";

import { Grid, Card, Typography, CardContent, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ItemCart from "../components/itemCart";
import { useHistory } from "react-router-dom";
import useCart from '../hooks/useCart'

const Order = ({ match }) => {
    const history = useHistory();
    const [order, setOrder] = useState(null);
    const { setCart } = useCart();

    useEffect(() => {
        const _usersService = new Users();
        setCart([])
        const getOrder = async () => {
            const response = await _usersService.getOrderById(match.params.id)
            setOrder(response.order)
        }
        getOrder()
    }, [match.params.id, setCart])

    console.log(order)
    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{ minHeight: "90vh" }}>
                <Grid item xs={11} sm={9} md={7} >
                    <Card>
                        <IconButton color="primary" size='medium' onClick={() => history.goBack()} >
                            <ArrowBackIcon />
                        </IconButton>
                        <>
                            {order !== null ?
                                <>
                                    <CardContent>
                                        <Typography variant="body1" component="p">ID: {order._id}</Typography>
                                        <br />
                                        <Typography variant="h5" component="h5">{order.personalData.name}</Typography>
                                        <Typography variant="body1" component="p">Direccion: {order.personalData.location}</Typography>
                                        <Typography variant="body1" component="p">Telefono: {order.personalData.phone}</Typography>
                                        <Typography variant="body1" component="p">Zona: {order.personalData.zone}</Typography>
                                        <Typography variant="body1" component="p">Dia: {order.personalData.day}</Typography>
                                        <Typography variant="body1" component="p">Medio de pago: {order.personalData.paymentMethod}</Typography>
                                        <br />
                                        <Typography variant="body2" component="p">Aclaraciones:<br /> {order.personalData.aclaraciones}</Typography>
                                        <br />
                                        <Typography variant="h5" component="h5">Productos:</Typography>
                                        {order.cart.map((item, index) => <ItemCart key={item._id} item={item} index={index} />)}
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