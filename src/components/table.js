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

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    input: {
        maxWidth: "2rem"
    },
    button: {
        margin: "0.5rem 0",
        color: theme.palette.common.white
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
    

    const handleChange = (e, item) => {
        const indexToModify = listItem.findIndex((element) => element.name === item.name );
        const newListItem = [...listItem];
        newListItem.splice(indexToModify, 1, {...item, [e.target.name]: parseInt(e.target.value)});
        setListItems(newListItem);

    }

    const onSubmit = () => {
        console.log(listItem)
    }

    return (
        <>
        <div  className="animate__animated animate__fadeIn">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Frutas y verduras</StyledTableCell>
                            <StyledTableCell align="right">Precio x Kg</StyledTableCell>
                            <StyledTableCell align="right">Unidades</StyledTableCell>
                            <StyledTableCell align="right">Kg</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listItem.map((item, index) => (
                            <StyledTableRow key={item.name}>
                                <StyledTableCell component="th" scope="row">
                                    {item.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">$ {item.price}</StyledTableCell>
                                <StyledTableCell align="right"><TextField placeholder={"0"} name='units' disabled={listItem[index].kg > 0} className={classes.input} onChange={(e) => handleChange(e, item)} /></StyledTableCell>
                                <StyledTableCell align="right"><TextField placeholder={"0"} name='kg' disabled={listItem[index].units > 0} className={classes.input} onChange={(e) => handleChange(e, item)} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={onSubmit}>Guardar en el carrito</Button>
            </div>
        </>
    );
}

export default MyTable;