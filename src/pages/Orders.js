import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Users from "../services/UserService";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useListItem from "../hooks/useListItem";

import { Grid, Card, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    input: {
        maxWidth: "6rem"
    },
    button: {
        margin: "0.5rem 0",
        color: theme.palette.common.white
    },
    kgCell: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "0.8rem"
        }
    },
    tableRoot: {
        margin: "0 0"
    }
}));

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


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Orders = () => {
    const history = useHistory();
    const { priceList } = useListItem()
    const [orders, setOrders] = useState([])
    const [zoneA, setZoneA] = useState([])
    const [zoneB, setZoneB] = useState([])
    const [zoneC, setZoneC] = useState([])
    const [zoneL, setZoneL] = useState([])
    const classes = useStyles();

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
            let zonaAState = [];
            let zonaBState = [];
            let zonaCState = [];
            let zonaLState = [];
            orders.map(order => {
                if (order.personalData.zone === "A") {
                    zonaAState.push(order)
                }
                if (order.personalData.zone === "B") {
                    zonaBState.push(order)
                }
                if (order.personalData.zone === "C") {
                    zonaCState.push(order)
                }
                if (order.personalData.zone === "L") {
                    zonaLState.push(order)
                }
                return null;
            })
            setZoneA(zonaAState)
            setZoneB(zonaBState)
            setZoneC(zonaCState)
            setZoneL(zonaLState)
        }
    }, [orders])


    const MyTable = ({ children }) => (
        <TableContainer className={classes.tableRoot} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Cliente</StyledTableCell>
                        <StyledTableCell >#</StyledTableCell>
                        <StyledTableCell >Direccion</StyledTableCell>
                        <StyledTableCell >Zona</StyledTableCell>
                        {
                            priceList.map(item => (
                                <StyledTableCell key={item.name}>{item.name}</StyledTableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    );


    const MyTableItems = ({ orders }) => {
        return (
            <>
                {orders.map((item, index) => (
                    <TableItem key={index} order={item} index={index} />
                ))}
            </>
        )
    }

    const TableItem = ({ order, index }) => {
        return (
            <>
                <StyledTableRow >
                    <StyledTableCell component="th" scope="row" >{order.personalData.name}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{index}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{order.personalData.location}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{order.personalData.zone}</StyledTableCell>
                    <Products order={order} />
                </StyledTableRow>
            </>
        )
    }

    const Products = ({ order }) => {

        return (
            <>
                {
                    priceList.map(product => {
                        let kg = 0;
                        let units = 0;


                        const addValueItem = (item) => {
                            if (item.name === product.name) {
                                if (item.kg !== undefined && parseInt(item.kg) > 0) {
                                    kg = +parseInt(item.kg);
                                } else if (item.units !== undefined && parseInt(item.units) > 0) {
                                    units = +parseInt(item.units);
                                }
                            }
                        }

                        order.cart.map(itemInCart => {
                            // ES UN ITEM NORMAL
                            if (itemInCart.items.length === 0) {
                                addValueItem(itemInCart);
                            } else {
                                itemInCart.items.map(itemInBox => itemInBox.active === true && addValueItem(itemInBox));
                                itemInCart.aggregates.map(itemInBox => addValueItem(itemInBox));
                            }
                        })


                        return (
                            <StyledTableCell key={product.name} component="th" scope="row" >{kg > 0 ? `${kg} kg` : ""} {kg > 0 && units > 0 && " y "} {units > 0 ? `${units} un` : ""}{kg === 0 && units === 0 && 0}</StyledTableCell>
                        )
                    })
                }
            </>
        )
    }

    const textStyle = {
        color: "#fff",
        backgroundColor: "#ff9a04",
        margin: "0.5rem 0",
        borderRadius: "0.25rem"
    }


    return (
        <>
            <Grid container justifyContent='center' style={{ minHeight: "90vh" }}>
                <Grid item xs={11} sm={11} md={11} >
                    <Button variant="contained" color="primary" size='medium' fullWidth style={{ color: "#fff", margin: "1rem 0" }} onClick={() => history.goBack()} >
                        Atras
                    </Button>
                    {zoneA.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Zona A</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems orders={zoneA} />
                                </MyTable>
                            </Card>
                        </>
                    }
                    {zoneB.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Zona B</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems orders={zoneB} />
                                </MyTable>
                            </Card>
                        </>
                    }
                    {zoneC.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Zona C</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems orders={zoneC} />
                                </MyTable>
                            </Card>
                        </>
                    }
                    {zoneL.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Local</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems orders={zoneL} />
                                </MyTable>
                            </Card>
                        </>
                    }
                </Grid>
            </Grid>
        </>
    );
}

export default Orders;