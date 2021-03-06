import { Grid, Card, TextField, Typography, IconButton, InputLabel, Select, MenuItem, Button, Modal, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Users from '../services/UserService';
import useBoxes from '../hooks/useBoxes';

import AddProductInBox from '../components/addProductInBox'
import useListItem from '../hooks/useListItem';

import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        padding: "0.5rem",
        margin: "1rem 0"
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
    verdesYAromaticas: {
        backgroundColor: "#78e341",
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
    const { priceList, setPriceList } = useListItem();
    const history = useHistory();

    const newItemINIT = {
        name: "",
        price: "",
        package: "Kg",
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

    const { boxesList, setBoxesList } = useBoxes();

    const [frutas, setFrutas] = useState([]);
    const [verduras, setVerduras] = useState([]);
    const [verdesYAromaticas, setVerdesYAromaticas] = useState([]);
    const [otros, setOtros] = useState([]);

    // MODAL 
    const [open, setOpen] = useState(false);
    const handleOpen = (item) => {
        setOpen(true);
        const { name, price, _id } = item;
        setModifyItem({ name, price, package: item.package, _id })
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
        setPriceList([...items, newItem]);
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
            setPriceList(newState);
            setModifyItem({});
        }
        postSubmit()
    }

    const addNewBox = () => {
        const postNewBox = async () => {
            const response = await UserService.newBox(newBox);
            setNewBox(newBoxINIT)
            setBoxesList([...boxesList, response])
        }
        postNewBox();
    }

    const removeBox = id => {
        const callRemoveBox = async id => {
            const response = await UserService.deleteBox(id);
            if (response) {
                const withOutBox = boxesList.filter(box => box._id !== id)
                setBoxesList(withOutBox)
            }
        }
        callRemoveBox(id);
    }

    const removeItemInBox = (boxId, itemId) => {
        const callRemoveItem = async (boxId, itemId) => {
            const response = await UserService.removeItemInBox(boxId, itemId)
            if (response.ok) {
                let newBoxList = [...boxesList];
                const box = newBoxList.find((box) => box._id === boxId);
                const index = newBoxList.indexOf(box);
                const newItemsList = newBoxList[index].items.filter(item => item._id !== itemId)
                delete newBoxList[index].items;
                newBoxList[index].items = newItemsList;
                setBoxesList(newBoxList)
            }
        }
        callRemoveItem(boxId, itemId)
    }

    useEffect(() => {
        setItems(priceList);
        // eslint-disable-next-line
    }, [priceList])


    useEffect(() => {
        let frutasState = items.filter(item => item.cat === "fruta");
        let verdurasState = items.filter(item => item.cat === "verdura");
        let verdesYAromaticasState = items.filter(item => item.cat === "verdesYAromaticas");
        let otrosState = items.filter(item => item.cat === "otro");

        setFrutas(frutasState);
        setVerduras(verdurasState);
        setVerdesYAromaticas(verdesYAromaticasState);
        setOtros(otrosState);

    }, [items]);

    const Items = ({ item }) => (
        <Grid container spacing={1} justifyContent="space-between" alignItems="center" key={item.name}>
            <Grid item xs={4}>
                <Typography component="p" variant="body1">{item.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography component="p" variant="body1">$ {item.price}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography component="p" variant="body1">{item.package}</Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton className={classes.deleteIcon} size='medium' onClick={() => DeleteItem(item._id)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
            <Grid item xs={2}>
                <IconButton style={{ color: "#000" }} size='medium' onClick={() => { handleOpen(item) }} >
                    <EditIcon />
                </IconButton>
            </Grid>
        </Grid>
    );

    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{ minHeight: "90vh" }}>
                <Grid item xs={11} sm={9} md={7} >
                    <Button variant="contained" color="primary" size='medium' fullWidth style={{color: "#fff"}} onClick={() => history.push('/orders')} >
                        Pedidos
                    </Button>
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
                        <div className={classes.verdesYAromaticas}>
                            {
                                verdesYAromaticas.length > 0 && <Typography component="h5" variant="h5">Verdes y Aromaticas:</Typography>
                            }
                            {
                                verdesYAromaticas.length > 0 && verdesYAromaticas.map((item) => (
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
                                    <MenuItem value={"verdesYAromaticas"}>Verdes y Aromaticas</MenuItem>
                                    <MenuItem value={"otro"}>Otro</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField placeholder="Precio" type='number' name='price' className={classes.input} onChange={handleChangeNewItem} value={newItem.price} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label="Presentacion" name='package' className={classes.input} onChange={handleChangeNewItem} value={newItem.package} />
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
                                <Grid container justifyContent="space-evenly" spacing={1} style={{ marginTop: "1rem" }}>
                                    <Grid item xs={4}>
                                        <TextField placeholder="Nombre" name='name' fullWidth className={classes.input} onChange={handleNewBox} value={newBox.name} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField placeholder="Precio" name='price' fullWidth className={classes.input} onChange={handleNewBox} value={newBox.price} />
                                    </Grid>
                                    <Grid item xs={2}>
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
                                        <div className={classes.box} key={box._id}>
                                            <Grid container justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="body1">{box.name}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">{box.price}</Typography>
                                                </Grid>
                                            </Grid>
                                            {box.items.length === 0 && <Typography variant="body1" align="center" color="secondary">Caja sin productos</Typography>}
                                            {box.items.length > 0 && <><Typography variant="body2">Items:</Typography></>}
                                            {box.items.length > 0 && box.items.map(item =>
                                                <Grid container justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body1">{item.name}</Typography>
                                                    {item.units > 0 && <Typography variant="body1">{item.units} unidades</Typography>}
                                                    {item.kg > 0 && <Typography variant="body1">{item.kg} kg</Typography>}
                                                    <IconButton className={classes.deleteIcon} size='small' onClick={() => removeItemInBox(box._id, item._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            )}
                                            <Typography variant="body1">Agregar producto:</Typography>
                                            <AddProductInBox boxID={box._id} />
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
                        <TextField placeholder={modifyItem.package} name='package' className={classes.input} onChange={handleModifyItem} />
                        <br />
                        <br />
                        <Grid container spacing={2} justifyContent="space-between">
                            <IconButton className={classes.deleteIcon} ><DeleteIcon fontSize="large" /></IconButton>
                            <IconButton color="primary" onClick={handleSubmit} ><SaveIcon fontSize="large" /></IconButton>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default Admin;