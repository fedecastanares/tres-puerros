import { Grid, Card, TextField, Typography, IconButton, InputLabel, Select, MenuItem, Button, Modal, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Users from '../services/UserService';
import useBoxes from '../hooks/useBoxes';


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
        color: theme.palette.common.white
    },
    primaryColor: {
        color: theme.palette.primary.main
    },
    deleteIcon: {
        color: theme.palette.secondary.main
    },
    cat: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.6rem"
        }
    },
    frutas: {
        backgroundColor: "#f9b922",
        padding: "1rem 0.5rem"
    },
    verduras: {
        backgroundColor: "#b0e341",
        padding: "1rem 0.5rem"
    },
    otros: {
        backgroundColor: "#228565",
        padding: "1rem 0.5rem"
    },
    box: {
        padding: "1rem 0.5rem",
        margin: "0.5rem 0",
        backgroundColor: "#ffcc52",
        borderRadius: 5
    }
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: `2px solid #6fc24d`,
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const Admin = () => {
    const classes = useStyles();
    const UserService = new Users();
    const newItemINIT = {
        name: "",
        price: "",
        weight: "",
        cat: ""
    }
    const newBoxINIT = {
        name: "",
        price: ""
    }
    const [newItem, setNewItem] = useState(newItemINIT);
    const [modifyItem, setModifyItem] = useState({});
    const [items, setItems] = useState([]);
    const [newBox, setNewBox] = useState(newBoxINIT);

    const { boxesList } = useBoxes();
    console.log(boxesList);

    const [frutas, setFrutas] = useState([]);
    const [verduras, setVerduras] = useState([]);
    const [otros, setOtros] = useState([]);

    // MODAL 
    const [open, setOpen] = useState(false);
    const handleOpen = (item) => {
        setOpen(true);
        const { name, price, weight, _id } = item;
        setModifyItem({ name, price, weight, _id })
    }
    const handleClose = () => setOpen(false);
    // MODAL

    const handleChangeNewItem = e => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value })
    }

    const handleNewBox = e => {
        setNewBox({ ...newBox, [e.target.name]: e.target.value })
    }

    const AddNewItem = () => {
        UserService.addNewItem(newItem);
        setItems([...items, newItem]);
        setNewItem(newItemINIT);
    }

    const handleModifyItem = (e) => {
        setModifyItem({ ...modifyItem, [e.target.name]: e.target.value })
    }

    const DeleteItem = id => {
        UserService.deleteUserById(id);
        let newState = [...items];
        let index = 0;
        newState.forEach((item, indexInForEach) => {
            if (item._id === id) {
                index = indexInForEach;
            }
        });
        newState.splice(index, 1);
        setItems(newState);
    }

    const handleSubmit = () => {
        const postSubmit = async () => {
            await UserService.modifyItem(modifyItem);
            setOpen(false);
            let newState = [...items];
            let index = 0;
            newState.forEach((item, indexInForEach) => {
                if (item._id === modifyItem._id) {
                    index = indexInForEach;
                }
            });
            newState[index] = { ...newState[index], price: modifyItem.price, weight: modifyItem.weight }
            setItems(newState);
            setModifyItem({});
        }
        postSubmit()
    }

    const addNewBox = () => {
        const postNewBox = async () => {
            const response = await UserService.newBox(newBox);
            setNewBox(newBoxINIT)
            console.log(response);
        }
        postNewBox();
    }

    const removeBox = id => {
        console.log(`Eliminar box: ${id}`);
    }

    useEffect(() => {
        const getItems = async () => {
            const response = await UserService.getItems();
            setItems(response.data.items);
        }
        getItems();
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        let frutasState = items.filter(item => item.cat === "fruta");
        let verdurasState = items.filter(item => item.cat === "verdura");
        let otrosState = items.filter(item => item.cat === "otro");

        frutasState = frutasState.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        verdurasState = verdurasState.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        otrosState = otrosState.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

        setFrutas(frutasState);
        setVerduras(verdurasState);
        setOtros(otrosState);

    }, [items]);

    const Items = ({ item }) => (
        <Grid container spacing={1} justifyContent="space-between" alignItems="center" key={item.name}>
            <Grid item xs={4}>
                <Typography component="p" variant="body1">{item.name}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography component="p" variant="body1">$ {item.price}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography component="p" variant="body1">{item.weight} grs</Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton className={classes.deleteIcon} size='medium' onClick={() => DeleteItem(item._id)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
            <Grid item xs={3}>
                <Button className={classes.checkIcon} variant="contained" color="primary" size='medium' onClick={() => { handleOpen(item) }} >
                    Modificar
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{ minHeight: "90vh" }}>
                <Grid item xs={11} sm={9} md={7} >
                    <Card className={classes.root}>
                        <Typography component="h1" variant="h5">Listado de productos:</Typography>
                        <div className={classes.frutas}>
                            {
                                frutas.length > 0 && <Typography component="h5" variant="h5">Frutas:</Typography>
                            }
                            {
                                frutas.length > 0 && frutas.map((item) => (
                                    <Items item={item} />
                                )
                                )
                            }
                        </div>
                        <div className={classes.verduras}>
                            {
                                verduras.length > 0 && <Typography component="h5" variant="h5">Verduras:</Typography>
                            }
                            {
                                verduras.length > 0 && verduras.map((item) => (
                                    <Items item={item} />
                                )
                                )
                            }
                        </div>
                        <div className={classes.otros}>
                            {
                                otros.length > 0 && <Typography component="h5" variant="h5">Otros:</Typography>
                            }
                            {
                                otros.length > 0 && otros.map((item) => (
                                    <Items item={item} />
                                )
                                )
                            }
                        </div>
                        <Typography style={{ marginTop: "1rem" }} component="h3" variant="h6">Agregar</Typography>
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
                            <Grid item >
                                <IconButton className={classes.primaryColor} size='medium' onClick={AddNewItem}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <div style={{ margin: "1rem 0" }}>
                            <Grid container >
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5">Cajas:</Typography>
                                </Grid>
                                <Typography style={{ marginTop: "1rem" }} component="h3" variant="h6">Agregar</Typography>
                                <Grid container justifyContent="space-evenly" style={{ marginTop: "1rem" }}>
                                    <Grid item >
                                        <TextField placeholder="Nombre" name='name' fullWidth className={classes.input} onChange={handleNewBox} value={newBox.name} />
                                    </Grid>
                                    <Grid item >
                                        <TextField placeholder="Precio" name='price' fullWidth className={classes.input} onChange={handleNewBox} value={newBox.price} />
                                    </Grid>
                                    <Grid item >
                                        <IconButton className={classes.primaryColor} size='medium' onClick={addNewBox}>
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Typography style={{ marginTop: "1rem" }} component="h3" variant="h6">Existentes:</Typography>
                            {
                                boxesList.length > 0 && boxesList.map(box => (
                                    <>
                                        <div className={classes.box}>
                                            <Grid container justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="body1">{box.name}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">{box.price}</Typography>
                                                </Grid>
                                            </Grid>
                                            {box.items.length === 0 && <Typography variant="body1" align="center" color="secondary">Caja sin productos</Typography>}
                                            <Typography variant="body1">Agregar producto:</Typography>
                                            <Button variant="contained" color="secondary" size='medium' fullWidth onClick={() => { removeBox(box._id) }} >
                                                Eliminar Caja
                                            </Button>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </Card>
                </Grid>
            </Grid>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modifyItem.name}
                        </Typography>
                        <br />
                        <TextField placeholder={modifyItem.price} type='number' name='price' className={classes.input} onChange={handleModifyItem} />
                        <br />
                        <br />
                        <TextField placeholder={modifyItem.weight} type='number' name='weight' className={classes.input} onChange={handleModifyItem} />
                        <br />
                        <br />
                        <Grid container spacing={2} justifyContent="space-between">
                            <IconButton className={classes.deleteIcon} ><DeleteIcon fontSize="large" /></IconButton>
                            <IconButton className={classes.checkIcon} onClick={handleSubmit} ><SaveIcon fontSize="large" /></IconButton>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default Admin;