import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@material-ui/core"
import useListItem from '../hooks/useListItem';

import userService from '../services/UserService';

import useBoxes from '../hooks/useBoxes'

const AddProductInBox = ({boxID}) => {

    const { boxesList, setBoxesList } = useBoxes();
    const qtyINIT = {
        qty: "",
        kg: ""
    };
    const { priceList } = useListItem();
    const [select, setSelect] = useState('');
    const [filter, setFilter] = useState('');
    const [qty, setQty] = useState(qtyINIT);
    const [products, setProducts] = useState([]);
    const _userService = new userService();

    const ChangeSelect = (event) => {
        setSelect(event.target.value);
    };

    const handleFilter = (e) => setFilter(e.target.value);

    const handleQTY = e => {
        setQty({ ...qty, [e.target.name]: e.target.value })
    }

    const addItemInnerBoxFn = () => {
        const order = {
            boxID: boxID,
            item: {_id: select, kg: qty.kg, qty: qty.qty}
        }
        const addItem = async order => {
            const response = await _userService.addItemInnerBox(order);
            if (response.ok) {
                setSelect('');
                setFilter('');
                setQty(qtyINIT);
                let newBoxList = [...boxesList];
                newBoxList.find(box => box._id === order.boxID && box.items.push(response.item))
                setBoxesList(newBoxList);
            }
        }

        addItem(order);
        

    }


    useEffect(() => {
        if (filter === '') {
            setProducts(priceList);
        } else {
            const newState = [...products].filter(item => item.name.startsWith(filter));
            setProducts(newState)
        }
    // eslint-disable-next-line
    }, [filter, priceList])

    return (
        <>
            <TextField fullWidth placeholder="Naranja" name='filter' label="Filtrar lista" variant="standard" value={filter} onChange={handleFilter} />
            <FormControl fullWidth>
                <InputLabel id="addProduct-label">Producto</InputLabel>
                <Select
                    labelId="addProduct-label"
                    id="addProduct"
                    value={select}
                    label="Producto"
                    onChange={ChangeSelect}
                >
                    {products.length > 0 &&
                        products.map(item => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
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