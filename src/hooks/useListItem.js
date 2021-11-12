import { useContext, useEffect, useState } from "react";
import { ListItemContext } from "../context/listItemContext";

const useListItem = () => {
    const { priceList, setPriceList } = useContext(ListItemContext);

    const [ listItem, setListItems ] = useState([]);

    useEffect(() => {
        let newListItem = [];
        priceList.map(item => newListItem.push({...item, units: 0, kg: 0}) )
        setListItems(newListItem);
    },[priceList])

    return {
        priceList,
        listItem,
        setListItems,
        setPriceList
    };
}

export default useListItem;