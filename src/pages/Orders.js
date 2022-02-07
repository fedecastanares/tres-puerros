import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Users from "../services/UserService";
import { withStyles } from '@material-ui/core/styles';
import useListItem from "../hooks/useListItem";

import { Grid, Card, Typography, Button, Box, TableCell, TableHead, TableRow, } from '@material-ui/core'
import MyTableOrders from '../components/MyTableOrders'
import Swal from 'sweetalert2'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        }
    },
}))(TableCell);


const Orders = () => {
    const history = useHistory();
    const { priceList } = useListItem()
    const [orders, setOrders] = useState([])
    const [martes, setMartes] = useState([])
    const [miercoles, setMiercoles] = useState([])
    const [jueves, setJueves] = useState([])

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
            let Jueves = [];
            orders.map(order => {
                if (order.personalData.day === "Martes") {
                    martes.push(order)
                }
                if (order.personalData.day === "Miercoles") {
                    miercoles.push(order)
                }
                if (order.personalData.day === "Jueves") {
                    Jueves.push(order)
                }
                return null;
            })

            // let zoneTotalValues = getTotalValues();
            setMartes(martes);
            setMiercoles(miercoles);
            setJueves(jueves);
        } else {
            setMartes([]);
            setMiercoles([]);
            setJueves([]);
        }
        // eslint-disable-next-line
    }, [orders])

    /*
    const getTotalValues = () => {
        let totalValues = {};
        orders.map(order => {
            priceList.map((product) => {
                if (order.personalData.name === "Julie MacGilivray" && product.name === "Banana Brasil") {
                    debugger
                }

                const addValueItem = (item) => {
                    if (item.name === product.name) {
                        if (item.kg !== undefined && parseFloat(item.kg) > 0) {
                            addTotalValue(item, "kg")
                        } else if (item.units !== undefined && parseFloat(item.units) > 0) {
                            addTotalValue(item, "units")
                        }
                    }
                }

                const addTotalValue = (item, type) => {
                    if (order.personalData.name === "Julie MacGilivray" && product.name === "Banana Brasil") {
                        debugger
                    }
                    const getPreviousValue = (key) => {
                        if ({ ...totalValues[key] }.hasOwnProperty(item.name)) {
                            if ({ ...totalValues[key][item.name] }.hasOwnProperty(type)) {

                                // Chequeo de historial de Valores
                                if (item.name === "Banana Brasil" && key === "totalValuesB") {

                                    console.log(`
**** Previus ****
cliente: ${order.personalData.name}\n
key: ${key} 
Item name: ${item.name} 
type: ${type}
value observado: ${totalValues[key][item.name][type]}\n
order ID: ${order._id}
value KG: ${totalValues[key][item.name].kg}
value unidad: ${totalValues[key][item.name].units}
**** Previus ****
                        `)

                                    return totalValues[key][item.name][type]
                                }
                            }
                            if (item.name === "Banana Brasil" && key === "totalValuesB") {
                                console.log(`diferente de: ${type}`)
                                console.log(totalValues[key][item.name])
                            }
                        }
                        return 0;
                    }


                    const updateTotalValues = (key) => {

                        if ({ ...totalValues[key] }.hasOwnProperty(item.name)) {
                            if (!{ ...totalValues[key][item.name] }.hasOwnProperty(type)) {
                                if (item.name === "Banana Brasil" && key === "totalValuesB") {

                                    console.log(totalValues[key][item.name])
                                    console.log(order)
                                }
                                totalValues[key][item.name][type] = getPreviousValue(key) + parseFloat(item[type])
                                if (item.name === "Banana Brasil" && key === "totalValuesB") {
                                    console.log(`
**** UPDATE ****
cliente: ${order.personalData.name}\n
key: ${key} 
Item name: ${item.name} 
type: ${type} 
value observado: ${totalValues[key][item.name][type]}\n
order ID: ${order._id}
value KG: ${totalValues[key][item.name].kg}
value unidad: ${totalValues[key][item.name].units}
**** UPDATE ****
                                        `)
                                }
                                return null;
                            }
                        }
                        totalValues = { ...totalValues, [key]: { ...totalValues[key], [item.name]: { [type]: getPreviousValue(key) + parseFloat(item[type]) } } };
                    }


                    if (order.personalData.zone === "A") {
                        updateTotalValues("totalValuesA")
                    }
                    if (order.personalData.zone === "B") {
                        updateTotalValues("totalValuesB")
                    }
                    if (order.personalData.zone === "C") {
                        updateTotalValues("totalValuesC")
                    }
                    if (order.personalData.zone === "L") {
                        updateTotalValues("totalValuesL")
                    }
                }


                order.cart.map(itemInCart => {
                    // ES UN ITEM NORMAL
                    if (itemInCart.items.length === 0) {
                        addValueItem(itemInCart);
                    } else {
                        // Iteracion en el carrito
                        itemInCart.items.map(itemInBox => itemInBox.active === true && addValueItem(itemInBox));
                        itemInCart.aggregates.map(itemInBox => addValueItem(itemInBox));
                    }
                    return null;
                })
                return null;
            })
            return null;
        })
        return totalValues;
    }
*/


    const ZoneTotals = ({ totalValues }) => {

        return (
            <>
                <TableHead>
                    <TableRow>
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                        <StyledTableCell component="th" scope="row" >Total: </StyledTableCell>
                        {
                            priceList.map((product) => {
                                if (totalValues[product.name] === undefined) {
                                    return (<StyledTableCell key={product.name} component="th" scope="row" >0</StyledTableCell>)
                                }
                                return (
                                    <StyledTableCell key={product.name} component="th" scope="row" >
                                        {totalValues[product.name].kg !== undefined ? `${totalValues[product.name].kg} kgs` : ""}{' '}
                                        {totalValues[product.name].units !== undefined ? `${totalValues[product.name].units} un` : ""}
                                    </StyledTableCell>)
                            })
                        }
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                    </TableRow>
                </TableHead>
            </>
        )
    }


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
                </Grid>
            </Grid>
        </>
    );
}

export default Orders;