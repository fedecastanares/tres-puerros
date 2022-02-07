import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { TextField, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useCart from '../hooks/useCart';

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
        margin: "1rem 0"
    },
    package: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.6rem',
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

const TableItem = ({ item }) => {
    const classes = useStyles();

    const { cart, setCart } = useCart();

    const [value, setValue] = useState({
        name: item.name,
        price: item.price,
        package: item.package
    })

    const canBeInCart = () => {
        if (value.kg > 0 || value.units > 0) {
            return true;
        }
        return false;
    }

    const handleClick = () => {
        if (canBeInCart()) {
            setCart([...cart, value]);
        }
    }

    const handleChange = (e) => {
        if (e.target.value === "") {
            let newState = { ...value };
            delete newState[e.target.name];
            setValue(newState);
        } else {
            setValue({ ...value, [e.target.name]: e.target.value })
        }
    }

    return (
        <>
            <StyledTableRow key={item.name}>
                <StyledTableCell component="th" scope="row" className={classes.item}>
                    {item.name}
                </StyledTableCell>
                <StyledTableCell style={{ whiteSpace: "nowrap" }} component="th" scope="row" className={classes.item}>
                    $ {item.price}
                </StyledTableCell>
                <StyledTableCell className={classes.smallCell} >
                    <TextField
                        variant="standard"
                        placeholder={"0"}
                        type='number'
                        name='units'
                        className={classes.input}
                        disabled={value.kg > 0}
                        value={value.units}
                        onChange={handleChange} />
                </StyledTableCell>
                <StyledTableCell className={classes.smallCell} >
                    <TextField
                        variant="standard"
                        placeholder={"0"}
                        type='number'
                        name='kg'
                        className={classes.input}
                        disabled={value.units > 0 || item.package.toLowerCase() !== "kg"}
                        value={value.kg}
                        onChange={handleChange} />
                </StyledTableCell>
                <StyledTableCell>
                    <Typography style={{ fontSize: "0.75rem" }} variant="body1" component="p" className={classes.package}>
                        {item.package}
                    </Typography>
                </StyledTableCell>
                <StyledTableCell >
                    <IconButton color="primary" size='medium' onClick={handleClick} >
                        <AddIcon />
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
}

export default TableItem;