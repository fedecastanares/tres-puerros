import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Users from "../services/UserService";

import { Grid, Card, Typography, Button, Box, } from '@material-ui/core'
import MyTableOrders from '../components/MyTableOrders'
import Swal from 'sweetalert2'


const Orders = () => {
    const history = useHistory();
    const [orders, setOrders] = useState([])
    const [martes, setMartes] = useState([])
    const [miercoles, setMiercoles] = useState([])
    const [jueves, setJueves] = useState([])
    const [otras, setOtras] = useState([])

    useEffect(() => {
        const _usersService = new Users();
        const getOrders = async () => {
            const response = await _usersService.getOrders();
            setOrders(response.orders)
        }
        getOrders();
    }, [])

    useEffect(() => {
        if (orders.length > 0) {
            let martes = [];
            let miercoles = [];
            let jueves = [];
            let Otras = [];
            orders.map(order => {
                if (order.personalData.day === "Martes") {
                    martes.push(order)
                }else if (order.personalData.day === "Miercoles") {
                    miercoles.push(order)
                } else if (order.personalData.day === "Jueves") {
                    jueves.push(order)
                } else {
                    Otras.push(order)
                }
                return null;
            })

            // let zoneTotalValues = getTotalValues();
            setMartes(martes);
            setMiercoles(miercoles);
            setJueves(jueves);
            setOtras(Otras)
        } else {
            setMartes([]);
            setMiercoles([]);
            setJueves([]);
            setOtras([])
        }
        // eslint-disable-next-line
    }, [orders])



    const textStyle = {
        color: "#fff",
        backgroundColor: "#ff9a04",
        margin: "0.5rem 0",
        borderRadius: "0.25rem"
    }

    const cleanOrders = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Vas a cambiar el estado de todas las ordenes a entregado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                const doClean = async () => {
                    const _usersService = new Users();
                    const { response } = await _usersService.cleanOrders(orders);
                    if (response) {
                        setOrders([])
                        Swal.fire(
                            'Entregadas!',
                            'Las ordenes fueron marcadas como entregadas.',
                            'success'
                        )
                    }
                }
                doClean();
            }
        })
    }


    return (
        <>
            <Grid container justifyContent='center' style={{ minHeight: "90vh", marginBottom: "5rem" }}>
                <Grid item xs={11} sm={11} md={11} >
                    <Grid container justifyContent="space-between">
                        <Grid item xs={5} >
                            <Button variant="contained" color="primary" size='medium' fullWidth style={{ color: "#fff", margin: "1rem 0" }} onClick={() => history.goBack()} >
                                Atras
                            </Button>
                        </Grid>
                        <Grid item xs={5} >
                            <Button variant="contained" color="secondary" size='medium' fullWidth style={{ color: "#fff", margin: "1rem 0" }} onClick={cleanOrders} >
                                Limpiar
                            </Button>
                        </Grid>
                    </Grid>
                    {martes.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Martes</Typography>
                            </Box>
                            <Card >
                                <MyTableOrders renderList={martes} />
                            </Card>
                        </>
                    }
                    {miercoles.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Miercoles</Typography>
                            </Box>
                            <Card >
                                <MyTableOrders renderList={miercoles} />
                            </Card>
                        </>
                    }
                    {jueves.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Jueves</Typography>
                            </Box>
                            <Card >
                                <MyTableOrders renderList={jueves} />
                            </Card>
                        </>
                    }
                    {otras.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Jueves</Typography>
                            </Box>
                            <Card >
                                <MyTableOrders renderList={jueves} />
                            </Card>
                        </>
                    }
                </Grid>
            </Grid>
        </>
    );
}

export default Orders;