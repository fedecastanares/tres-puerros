import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@material-ui/core"
import useListItem from '../hooks/useListItem';

import _userService from '../services/UserService';

const AddProductInBox = ({boxID}) => {

    const { priceList } = useListItem();
    const [select, setSelect] = useState('');
    const [filter, setFilter] = useState('');
    const [qty, setQty] = useState({
        qty: "",
        kg: ""
    });
    const [products, setProducts] = useState([]);

    const ChangeSelect = (event) => {
        setSelect(event.target.value);
    };

    const handleFilter = (e) => setFilter(e.target.value);

    const handleQTY = e => {
        setQty({ ...qty, [e.target.name]: e.target.value })
    }

    const addItemInnerBoxFn = () => {
        const {name, id} = select;
        const order = {
            boxID: boxID,
            item: {id, name, kg: qty.kg, qty: qty.qty}
        }
        /*
        const addItem = async order => {
            console.log(order);
            console.log(select.name);
            const response = await _userService.prueba();
            console.log(response);
        }

        addItem(order);
        */
       _userService.prueba();
    }


    useEffect(() => {
        if (filter === '') {
            setProducts(priceList);
        } else {
            const newState = [...products].filter(item => item.name.startsWith(filter));
            setProducts(newState)
        }
    }, [filter, priceList])

    return (
        <>
            <TextField fullWidth placeholder="Naranja" name='filter' label="Filtrar lista" variant="standard" value={filter} onChange={handleFilter} />
            <FormControl fullWidth>
                <InputLabel id="addProduct-label">Producto</InputLabel>
                <Select
                    labelId="addProduct-label"
                    id="addProduct"
                    value={select.name}
                    label="Producto"
                    onChange={ChangeSelect}
                >
                    {products.length > 0 &&
                        products.map(item => <MenuItem key={item._id} value={{id:item._id, name: item.name}}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField fullWidth placeholder="0" name='qty' type="number" label="Cantidad" variant="standard" value={qty.qty} onChange={handleQTY} />
            <TextField fullWidth placeholder="0" name='kg'  type="number" label="Kg" variant="standard" value={qty.kg} onChange={handleQTY} />
            <Button variant="contained" color="primary" size='medium' fullWidth style={{color:"#fff"}} onClick={addItemInnerBoxFn}>
                Agregar
            </Button>
        </>
    );
}

export default AddProductInBox;