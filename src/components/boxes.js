import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, IconButton, TextField } from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import useBoxes from '../hooks/useBoxes';
import CheckIcon from '@material-ui/icons/Check';
import useCart from '../hooks/useCart';
// import MyAutocomplete from './autocompleteProduct';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '2rem'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    itemsContainer: {
        padding: "0.5rem",
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    gridContainer: {
        border: `1px solid  ${theme.palette.action.hover}`,
        borderRadius: "0.5rem"
    },
    fruitPrice: {
        marginLeft: 10,
        marginRight: 10
    },
    details: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem'
        }
    },
    decorator: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.5rem'
        }
    },
    button: {
        margin: "0.5rem 0",
        color: theme.palette.common.white
    },
    checkIcon: {
        color: theme.palette.primary.main
    },
    lineThrough: {
        textDecoration: 'line-through'
    },
    input: {
        margin: 7
    },
    canChange: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem'
        }
    },
    boxesTitle: {
        backgroundColor: theme.palette.primary.main,
        padding: "1rem",
        color: theme.palette.common.white,
        border: `0 solid #808080`,
        outlineColor: "rgba(0, 0, 0, 0.87)",
        "-webkit-font-smoothing": "antialiased",
        borderRadius: "0.3rem 0.3rem 0 0",
        fontSize: 14,
        fontWeight: 500
    }
}));


const Boxes = () => {
    const classes = useStyles();

    const { boxesListState, setBoxesListState } = useBoxes();
    const { cart, setCart } = useCart();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClick = (item, indexOfItem, indexOfBox) => {
        if (boxesListState[indexOfBox].activeItems < 3 || (boxesListState[indexOfBox].activeItems === 3 && !item.active)) {
            let newState = [...boxesListState];
            newState[indexOfBox].items[indexOfItem].active = !item.active;
            !item.active ? ++newState[indexOfBox].activeItems : --newState[indexOfBox].activeItems;
            if (newState[indexOfBox].activeItems < newState[indexOfBox].aggregates.length) {
                newState[indexOfBox].aggregates.length = newState[indexOfBox].aggregates.length - 1;
            }
            setBoxesListState(newState);
        }
    }

    const onInputChange = (e, index, indexAggregates) => {
        let newBoxesList = [...boxesListState];
        newBoxesList[index].aggregates[indexAggregates] = { ...newBoxesList[index].aggregates[indexAggregates], [e.target.name]: e.target.value };
        setBoxesListState(newBoxesList);
    };

    const onAddToCart = (index) => {
        setCart([...cart, boxesListState[index]])
    }


    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <div className={classes.root}>
                    {boxesListState.length > 0 && <Typography className={classes.boxesTitle}>Cajas estacionales</Typography>}
                    {

                        boxesListState.length > 0 && boxesListState.map((box, index) => (
                            <div key={index}>
                                <Accordion expanded={expanded === `panel${index}`} TransitionProps={{ unmountOnExit: true }} onChange={handleChange(`panel${index}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Grid container justifyContent='space-between'>
                                            <Grid item>
                                                <Typography className={classes.heading}>{box.name}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography className={classes.heading}>$ {box.price}</Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.accordionBody}>
                                        <Grid container direction='column'>
                                            <Grid container direction='column' className={classes.gridContainer}>
                                                {box.items.map((item, indexOfItem) => (
                                                    <div key={`${item.name}-row-${indexOfItem}`} id={`${item.name}-row-${indexOfItem}`} className={classes.itemsContainer} >
                                                        <Grid container className={!item.active && classes.lineThrough} alignItems='center'>
                                                            <Grid item xs={4}>
                                                                <Typography className={classes.details}>
                                                                    {item.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                {item.qty > 0 && <Typography className={classes.details} align="right">
                                                                    {item.qty} <span className={classes.decorator}>unidades</span>
                                                                </Typography>}
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                {item.kg > 0 && <Typography className={classes.details} align="right">
                                                                    {item.kg} <span className={classes.decorator}>kg</span>
                                                                </Typography>}
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Grid container justifyContent="center">
                                                                {item.active ?
                                                                    <IconButton  color="primary" size='medium' onClick={() => handleClick(item, indexOfItem, index)}>
                                                                        <CheckIcon />
                                                                    </IconButton>
                                                                    :
                                                                    <IconButton color='secondary' size='medium' align="center" onClick={() => handleClick(item, indexOfItem, index)}>
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                }
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ))}
                                                {
                                                    box.activeItems > 0 &&
                                                    [...Array(box.activeItems)].map((value, indexAggregates) =>
                                                        React.Children.toArray(
                                                            <div className="animate__animated animate__slideInDown">
                                                                <Grid container spacing={2} alignItems='center'>
                                                                    <Grid item xs={6}>
                                                                        <Grid container >
                                                                            <Grid item xs={8} style={{margin: "1rem 0"}}>
                                                                                <TextField className={`${classes.details} ${classes.input}`} variant="standard" name="product" placeholder='Producto' onChange={(e) => onInputChange(e, index, indexAggregates)} />
                                                                            </Grid>
                                                                            <Grid item xs={4}>
                                                                                {/*
                                                                                <Typography className={classes.details}>
                                                                                    $ precio <span className={classes.decorator}>kg</span>
                                                                                </Typography>
                                                                                 */}

                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={2}>
                                                                        <TextField className={classes.details} variant="standard" type='number' name='units' placeholder='unidades' disabled={boxesListState[index].aggregates[indexAggregates] !== undefined && boxesListState[index].aggregates[indexAggregates].hasOwnProperty("kg")} onChange={(e) => onInputChange(e, index, indexAggregates)} />
                                                                    </Grid>
                                                                    <Grid item xs={2}>
                                                                        <TextField className={classes.details} variant="standard" type='number' name='kg' placeholder='kg' disabled={boxesListState[index].aggregates[indexAggregates] !== undefined && boxesListState[index].aggregates[indexAggregates].hasOwnProperty("units")} onChange={(e) => onInputChange(e, index, indexAggregates)} />
                                                                    </Grid>
                                                                    <Grid item xs={2}>
                                                                        {/*<IconButton size='medium' color='secondary'>
                                                                            <DeleteIcon />
                                                                                </IconButton> */}
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        ))
                                                }
                                            </Grid>
                                            <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={() => onAddToCart(index)}>Agregar al carrito</Button>
                                            <Typography className={classes.canChange} variant="body1" component="p" color="secondary" align="right">Puedes cambiar hasta 3 productos</Typography>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Boxes;