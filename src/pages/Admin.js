import { Grid, Card, TextField, Typography, IconButton, InputLabel, Select, MenuItem, Button, Modal, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

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
    cat: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.6rem"
        }
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
    const [newItem, setNewItem] = useState(newItemINIT);
    const [modifyItem, setModifyItem] = useState({});
    const [items, setItems] = useState([]);

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

    useEffect(() => {
        const getItems = async () => {
            const response = await UserService.getItems();
            setItems(response.data.items);
        }
        getItems();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{ minHeight: "90vh" }}>
                <Grid item xs={11} sm={9} md={7} >
                    <Card className={classes.root}>
                        <Typography component="h1" variant="h5">Listado de productos:</Typography>
                        {
                            items.length > 0 && items.map((item) => (
                                <Grid container spacing={1} justifyContent="space-between" alignItems="center" key={item.name}>
                                    <Grid item xs={3}>
                                        <Typography component="p" variant="body1">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography component="p" variant="body1">{item.price}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography component="p" variant="body1">{item.weight}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography component="p" variant="body1">{item.cat}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton className={classes.deleteIcon} size='medium' onClick={() => DeleteItem(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button className={classes.checkIcon} size='medium' onClick={() => { handleOpen(item) }} >
                                            Modificar
                                        </Button>
                                    </Grid>
                                </Grid>
                            )
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
            <div>
                <Button onClick={handleOpen}>Open modal</Button>
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