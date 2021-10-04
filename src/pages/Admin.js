import { Grid, Card, TextField, Typography, IconButton, InputLabel, Select, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Users from '../services/UserService';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        padding: "0.5rem"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    img: {
        height: '5rem',
        width: 'auto'
    },
    checkIcon: {
        color: theme.palette.primary.main
    },
    deleteIcon: {
        color: theme.palette.secondary.main
    },
}));

const Admin = () => {
    const classes = useStyles();
    const UserService = new Users();
    const newItemINIT = {
        name: "",
        price: "",
        weight: "",
        cat: ""
    }
    const [newItem, setNewItem] = useState(newItemINIT);
    const [items, setItems] = useState([]);

    const handleChangeNewItem = e => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value })
    }

    const AddNewItem = () => {
        UserService.addNewItem(newItem); 
        setItems([...items, newItem]);
        setNewItem(newItemINIT);
    }

    useEffect(() => {
        const getItems = async () => {
            const response = await UserService.getItems();
            response !== undefined && setItems(response.data.items);
        }
        getItems();
    }, [])

    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{ minHeight: "90vh" }}>
                <Grid item xs={11} sm={9} md={7} >
                    <Card className={classes.root}>
                        <Typography component="h1" variant="h5">Listado de productos:</Typography>
                        {
                            items.length > 0 && items.map(item =>
                                <>
                                    <Grid container spacing={1} justifyContent="space-between" alignItems="center">
                                        <Grid item xs={4}>
                                            <Typography component="p" variant="body1">{item.name}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography component="p" variant="body1">{item.cat}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <TextField placeholder={item.price} type='number' name='price' className={classes.input} />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <TextField placeholder={item.weight} type='number' name='weight' className={classes.input} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton className={classes.checkIcon} size='medium' >
                                                <SaveIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton className={classes.deleteIcon} size='medium' >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        }

                        <Typography component="h3" variant="h6">Agregar</Typography>
                        <Grid container spacing={2} style={{ margin: "0.5rem 0" }} justifyContent="space-evenly" alignItems="flex-end">
                            <Grid item xs={3}>
                                <TextField placeholder="Nombre" name='name' className={classes.input} onChange={handleChangeNewItem} value={newItem.name} />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="zone-select-label"
                                    id="zone-select"
                                    value={newItem.cat}
                                    label="Categoria"
                                    onChange={handleChangeNewItem}
                                    name="cat"
                                    className={classes.select}
                                >
                                    <MenuItem value={"fruta"}>Fruta</MenuItem>
                                    <MenuItem value={"verdura"}>Verdura</MenuItem>
                                    <MenuItem value={"otro"}>Otro</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField placeholder="Precio kg" type='number' name='price' className={classes.input} onChange={handleChangeNewItem} value={newItem.price} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField placeholder="Peso un" type='number' name='weight' className={classes.input} onChange={handleChangeNewItem} value={newItem.weight} />
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton className={classes.checkIcon} size='medium' onClick={AddNewItem}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Admin;