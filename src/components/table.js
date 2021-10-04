import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField, Button } from '@material-ui/core';

import useListItem from '../hooks/useListItem'
import useCart from '../hooks/useCart';

const useStyles = makeStyles((theme) => ({
    input: {
        maxWidth: "3rem"
    },
    button: {
        margin: "0.5rem 0",
        color: theme.palette.common.white
    },
    kgCell: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "0.8rem"
        }
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


const MyTable = () => {
    const classes = useStyles();
    const { listItem, setListItems } = useListItem();
    const { cart, setCart } = useCart();
    

    const handleChange = (e, item) => {
        const indexToModify = listItem.findIndex((element) => element.name === item.name );
        const newListItem = [...listItem];
        newListItem.splice(indexToModify, 1, {...item, [e.target.name]: parseInt(e.target.value)});
        setListItems(newListItem);

    }

    const onSubmit = () => {
        const addItem = [...listItem].filter(product => product.units > 0 || product.kg > 0 );
        let newItemsCart = [...cart];
        addItem.forEach(item => newItemsCart.push(item));
        setCart(newItemsCart);
    }


    return (
        <>
        <div  className="animate__animated animate__fadeIn">
            <form noValidate onSubmit={onSubmit}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className={classes.item}>Frutas y verduras</StyledTableCell>
                                <StyledTableCell className={classes.smallCell} >Unidades</StyledTableCell>
                                <StyledTableCell className={classes.smallCell}>Kg</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listItem.map((item, index) => (
                                <StyledTableRow key={item.name}>
                                    <StyledTableCell component="th" scope="row" className={classes.item}>
                                        {item.name} $ {item.price} <span className={classes.kgCell}>kg</span>
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.smallCell} ><TextField placeholder={"0"} type='number' name='units' disabled={listItem[index].kg > 0} className={classes.input} onChange={(e) => handleChange(e, item)} /></StyledTableCell>
                                    <StyledTableCell className={classes.smallCell} ><TextField placeholder={"0"} type='number' name='kg' disabled={listItem[index].units > 0} className={classes.input} onChange={(e) => handleChange(e, item)} /></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={onSubmit}>Agregar al carrito</Button>
                </form>
            </div>
        </>
    );
}

export default MyTable;