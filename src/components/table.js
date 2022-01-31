import { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import TableItem from "./tableItem"

import useListItem from '../hooks/useListItem'


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


const MyTable = () => {
    const classes = useStyles();
    const { listItem } = useListItem();

    const [frutas, setFrutas] = useState([]);
    const [verduras, setVerduras] = useState([]);
    const [verdesYAromaticas, setVerdesYAromaticas] = useState([]);
    const [otros, setOtros] = useState([]);


    useEffect(() => {
        let frutasState = listItem.filter(item => item.cat === "fruta");
        let verdurasState = listItem.filter(item => item.cat === "verdura");
        let verdesYAromaticasState = listItem.filter(item => item.cat === "verdesYAromaticas");
        let otrosState = listItem.filter(item => item.cat === "otro");

        frutasState = frutasState.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        verdurasState = verdurasState.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        verdesYAromaticasState = verdesYAromaticasState.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        otrosState = otrosState.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

        setFrutas(frutasState);
        setVerduras(verdurasState);
        setVerdesYAromaticas(verdesYAromaticasState);
        setOtros(otrosState);

    }, [listItem]);

    const MyTable = ({ title, children }) => (
        <TableContainer className={classes.tableRoot} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className={classes.item}>{title}</StyledTableCell>
                        <StyledTableCell className={classes.smallCell}>$</StyledTableCell>
                        <StyledTableCell className={classes.smallCell} >Un</StyledTableCell>
                        <StyledTableCell className={classes.smallCell}>Kg</StyledTableCell>
                        <StyledTableCell className={classes.smallCell}>Pack</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const MyTableItems = ({ renderList }) => {
        return (
            <>
                {renderList.map((item) => (
                    <TableItem item={item} />
                ))}
            </>
        )
    }

    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <form noValidate>

                    {frutas.length > 0 &&
                        <MyTable title={"Frutas"}>
                            <MyTableItems renderList={frutas} />
                        </MyTable>
                    }

                    {verduras.length > 0 &&
                        <MyTable title={"Verduras"}>
                            <MyTableItems renderList={verduras} />
                        </MyTable>
                    }

                    {verdesYAromaticas.length > 0 &&
                        <MyTable title={"Verdes y Aromaticas"}>
                            <MyTableItems renderList={verdesYAromaticas} />
                        </MyTable>
                    }

                    {otros.length > 0 &&
                        <MyTable title={"Otros"}>
                            <MyTableItems renderList={otros} />
                        </MyTable>
                    }

                    {/*<Button fullWidth variant="contained" color="primary" className={classes.button} onClick={onSubmit}>Agregar al carrito</Button>*/}
                </form>
            </div>
        </>
    );
}

export default MyTable;