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
    const zoneInit = {
        orders: [],
        totalValues: []
    }

    const [zoneA, setZoneA] = useState(zoneInit)
    const [zoneB, setZoneB] = useState(zoneInit)
    const [zoneC, setZoneC] = useState(zoneInit)
    const [zoneL, setZoneL] = useState(zoneInit)
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

            let zoneTotalValues = getTotalValues();

            setZoneA({ ...zoneA, orders: zonaAState, totalValues: zoneTotalValues.totalValuesA })
            setZoneB({ ...zoneB, orders: zonaBState, totalValues: zoneTotalValues.totalValuesB })
            setZoneC({ ...zoneC, orders: zonaCState, totalValues: zoneTotalValues.totalValuesC })
            setZoneL({ ...zoneL, orders: zonaLState, totalValues: zoneTotalValues.totalValuesL })
        }
        // eslint-disable-next-line
    }, [orders])

    const getTotalValues = () => {
        let totalValues = {};
        orders.map(order => {
            priceList.map((product) => {

                const addValueItem = (item) => {
                    if (item.name === product.name) {
                        if (item.kg !== undefined && parseFloat(item.kg) > 0) {
                            addTotalValue(item, "kg")
                        } else if (item.units !== undefined && parseFloat(item.units) > 0) {
                            addTotalValue(item, "units")
                        }

                        if ( item.name === "Banana Ecuador") {
                            //console.log(order)
                        }
                    }
                }

                const addTotalValue = (item, type) => {

                    const getPreviousValue = (key) => {
                        if ({ ...totalValues[key] }.hasOwnProperty(item.name)) {
                            if ({ ...totalValues[key][item.name] }.hasOwnProperty(type)) {
                                if (item.name === "Banana Ecuador" &&  key === "totalValuesB") {
                                    console.log(`key: ${key} \nItem name: ${item.name} \ntype: ${type} \nvalue: ${totalValues[key][item.name][type]}`)
                                }
                                return totalValues[key][item.name][type]
                            }
                        }
                        return 0;
                    }


                    const updateTotalValues = (key) => {

                        if ({ ...totalValues[key] }.hasOwnProperty(item.name)) {
                            if (!{ ...totalValues[key][item.name] }.hasOwnProperty(type)) {
                                totalValues = { ...totalValues, [key]: { ...totalValues[key], [item.name]: { ...totalValues[key][item.name], [type]: getPreviousValue(key) + parseFloat(item[type]) } } }
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


    const MyTable = ({ children }) => (
        <TableContainer className={classes.tableRoot} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Cliente</StyledTableCell>
                        <StyledTableCell >#</StyledTableCell>
                        <StyledTableCell >Direccion</StyledTableCell>
                        <StyledTableCell >Zona</StyledTableCell>
                        <StyledTableCell >Dia</StyledTableCell>
                        {
                            priceList.map(item => (
                                <StyledTableCell key={item.name}>{item.name}</StyledTableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                {children}
            </Table>
        </TableContainer>
    );


    const MyTableItems = ({ zone }) => {
        return (
            <>
                <TableBody>
                    {zone.orders.map((order, index) => (
                        <TableItem key={index} order={order} index={index} />
                    ))}
                </TableBody>
                <ZoneTotals totalValues={zone.totalValues} />
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
                    <StyledTableCell component="th" scope="row" >{order.personalData.day}</StyledTableCell>
                    <Products order={order} />
                </StyledTableRow>
            </>
        )
    }

    const Products = ({ order }) => {

        return (
            <>
                {
                    priceList.map((product) => {
                        let kg = 0;
                        let units = 0;

                        const addValueItem = (item) => {
                            if (item.name === product.name) {
                                if (item.kg !== undefined && parseFloat(item.kg) > 0) {
                                    kg = +parseFloat(item.kg);
                                } else if (item.units !== undefined && parseFloat(item.units) > 0) {
                                    units = +parseFloat(item.units);
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
                            return null;
                        })
                        return (
                            <StyledTableCell key={product.name} component="th" scope="row" >{kg > 0 ? `${kg} kg` : ""} {kg > 0 && units > 0 && " y "} {units > 0 ? `${units} un` : ""}{kg === 0 && units === 0 && 0}</StyledTableCell>
                        )
                    })
                }
            </>
        )
    }

    const ZoneTotals = ({ totalValues }) => {

        return (
            <>
                <TableHead>
                    <TableRow>
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


    return (
        <>
            <Grid container justifyContent='center' style={{ minHeight: "90vh", marginBottom: "5rem" }}>
                <Grid item xs={11} sm={11} md={11} >
                    <Button variant="contained" color="primary" size='medium' fullWidth style={{ color: "#fff", margin: "1rem 0" }} onClick={() => history.goBack()} >
                        Atras
                    </Button>
                    {zoneA.orders.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Zona A</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems zone={zoneA} />
                                </MyTable>
                            </Card>
                        </>
                    }
                    {zoneB.orders.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Zona B</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems zone={zoneB} />
                                </MyTable>
                            </Card>
                        </>
                    }
                    {zoneC.orders.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Zona C</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems zone={zoneC} />
                                </MyTable>
                            </Card>
                        </>
                    }
                    {zoneL.orders.length > 0 &&
                        <>
                            <Box sx={textStyle} >
                                <Typography variant="h5" component="h3" style={{ padding: "0 0.5rem" }}>Local</Typography>
                            </Box>
                            <Card >
                                <MyTable>
                                    <MyTableItems zone={zoneL} />
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