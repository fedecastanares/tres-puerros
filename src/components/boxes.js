import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '5rem',
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
    }   
}));


const Boxes = () => {
    const classes = useStyles();
    const boxesList = [
        {
            name: "Caja basica",
            price: "550",
            items: [
                {
                    name: "Banana",
                    price: 500,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 88,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        },
        {
            name: "Caja avanzada",
            price: "650",
            items: [
                {
                    name: "Banana",
                    price: 50,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 6,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        },
        {
            name: "Caja premium",
            price: "950",
            items: [
                {
                    name: "Banana",
                    price: 50,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 6,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        },
        {
            name: "Caja total",
            price: "1250",
            items: [
                {
                    name: "Banana",
                    price: 50,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 6,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        }
    ];

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <div className={classes.root}>
                    {

                        boxesList && boxesList.map((box, index) => (
                            <div key={index}>
                                <Accordion  expanded={expanded === `panel${index}`} TransitionProps={{ unmountOnExit: true }} onChange={handleChange(`panel${index}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        className={classes.accordion}
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
                                    <AccordionDetails>
                                        <Grid container direction='column'>
                                            <Grid container direction='column' className={classes.gridContainer} >
                                                {box.items.map((item, index) => (
                                                    <div key={`${item.name}-row-${index}`} id={`${item.name}-row-${index}`} className={classes.itemsContainer} >
                                                        <Grid container alignItems='center'>
                                                            <Grid item xs={6}>
                                                                <Grid container >
                                                                    <Grid item xs={8}>
                                                                        <Typography className={classes.details}>
                                                                            {item.name}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <Typography className={classes.details}>
                                                                            $ {item.price} <span className={classes.decorator}>kg</span>
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                {item.units > 0 && <Typography className={classes.details} align="right">
                                                                    {item.units} <span className={classes.decorator}>unidades</span>
                                                                </Typography>}
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                {item.kg > 0 && <Typography className={classes.details}>
                                                                    {item.kg} <span className={classes.decorator}>kg</span>
                                                                </Typography>}
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <IconButton color='secondary' size='medium'>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ))}
                                            </Grid>
                                            <Button fullWidth variant="contained" color="primary" className={classes.button}>Agregar al carrito</Button>
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