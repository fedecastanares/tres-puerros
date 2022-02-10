import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useListItem from "../hooks/useListItem";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';

import VisibilityIcon from '@material-ui/icons/Visibility';


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

const MyTableOrders = ({ renderList }) => {
    const classes = useStyles();
    const history = useHistory();
    const { priceList } = useListItem();


    useEffect(() => {
        setTotals(totals)
        // eslint-disable-next-line
    }, [])

    const [totalsState, setTotals] = useState({})
    let totals = {};

    const MyTable = ({ renderList }) => (
        <TableContainer className={classes.tableRoot} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <ZoneTotals totalValues={totalsState} />
                    <TableRow>
                        <StyledTableCell ></StyledTableCell>
                        <StyledTableCell >Cliente</StyledTableCell>
                        <StyledTableCell >#</StyledTableCell>
                        <StyledTableCell >Celular</StyledTableCell>
                        <StyledTableCell >Direccion</StyledTableCell>
                        <StyledTableCell >Zona</StyledTableCell>
                        <StyledTableCell >Dia</StyledTableCell>
                        {
                            priceList.map(item => (
                                <StyledTableCell key={item.name}>{item.name}</StyledTableCell>
                            ))
                        }
                        <StyledTableCell >Aclaraciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <MyTableItems renderList={renderList} />
            </Table>
        </TableContainer>
    );

    const MyTableItems = ({ renderList }) => {
        return (
            <>
                <TableBody>
                    {renderList.map((order, index) => (
                        <TableItem key={index} order={order} index={index} />
                    ))}
                </TableBody>
            </>
        )
    }

    const TableItem = ({ order, index }) => {
        const handleClick = (order) => {
            history.push(`/order/${order._id}`)
        }


        return (
            <>
                <StyledTableRow >
                    <StyledTableCell component="th" scope="row" >
                        <IconButton color="primary" size='medium' onClick={() => handleClick(order)} >
                            <VisibilityIcon />
                        </IconButton>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{order.personalData.name}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{index}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{order.personalData.phone}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{order.personalData.location}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{order.personalData.zone}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" >{order.personalData.day}</StyledTableCell>
                    <Products order={order} />
                    <StyledTableCell component="th" scope="row" >{order.personalData.aclaraciones}</StyledTableCell>
                </StyledTableRow>
            </>
        )
    }

    const ZoneTotals = ({ totalValues }) => {

        return (
            <>
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
                                        {totalValues[product.name].kg !== undefined ? `${parseFloat(totalValues[product.name].kg)} kgs` : ""}{' '}
                                        {totalValues[product.name].units !== undefined ? `${parseFloat(totalValues[product.name].units)} un` : ""}
                                    </StyledTableCell>)
                            })
                        }
                        <StyledTableCell component="th" scope="row" ></StyledTableCell>
                    </TableRow>
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

                        const addProductToTal = (product, key) => {
                            if (totals.hasOwnProperty(product.name)) {
                                if (totals[product.name].hasOwnProperty(key)) {
                                    totals[product.name][key] = parseFloat(totals[product.name][key]) + parseFloat(product[key])
                                } else {
                                    totals[product.name][key] = parseFloat(product[key])
                                }
                            } else {
                                totals[product.name] = {
                                    kg: 0,
                                    units: 0
                                }
                                totals[product.name][key] = parseFloat(product[key])
                            }
                        }


                        const addValueItem = (item) => {
                            if (item.name === product.name) {
                                if (item.kg !== undefined && parseFloat(item.kg) > 0) {
                                    kg = +parseFloat(item.kg);
                                    addProductToTal(item, "kg")
                                } else if (item.units !== undefined && parseFloat(item.units) > 0) {
                                    units = +parseFloat(item.units);
                                    addProductToTal(item, "units")
                                }
                            }
                        }

                        order.cart.map(itemInCart => {
                            // ES UN ITEM NORMAL
                            if (itemInCart.items.length === 0) {
                                addValueItem(itemInCart);
                            } else {
                                // ITERACCION EN EL CARRITO
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

    return (
        <>
            <MyTable renderList={renderList} />
        </>
    );
}

export default MyTableOrders;