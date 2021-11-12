import React, {createContext, useEffect, useState} from 'react';

import Users from '../services/UserService';

export const ListItemContext = createContext();

const ListItemProvider = ({children}) => {

    const UserService = new Users();

    const [priceList, setPriceList] = useState([])

    useEffect(() => {
        const getPriceList = async () => {
            const response = await UserService.getItems();
            let items = response.data.items;
            items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setPriceList(items);
        }
        getPriceList();
    // eslint-disable-next-line
    }, [])
    

    return ( 
        <>
        <ListItemContext.Provider 
            value={{
                priceList,
                setPriceList
            }}
        >
            {children}
        </ListItemContext.Provider>
        </>
     );
}
 
export default ListItemProvider;