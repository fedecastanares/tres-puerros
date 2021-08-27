import { useContext, useState } from "react";
import { ListItemContext } from "../context/listItemContext";

const useListItem = () => {
    const { priceList } = useContext(ListItemContext);

    let listItemInit = [];
    priceList.map(item => listItemInit.push({...item, units: 0, kg: 0}))

    const [ listItem, setListItems ] = useState(listItemInit);

    return {
        priceList,
        listItem,
        setListItems
    };
}

export default useListItem;