import React, {createContext, useEffect, useState} from 'react';

import Users from '../services/UserService';

export const ListItemContext = createContext();

const ListItemProvider = ({children}) => {

    const UserService = new Users();

    const [priceList, setPriceList] = useState([])

    useEffect(() => {
        const getPriceList = async () => {
            const response = await UserService.getItems();
            setPriceList(response.data.items);
        }
        getPriceList();
    // eslint-disable-next-line
    }, [])
    

    return ( 
        <>
        <ListItemContext.Provider 
            value={{
                priceList
            }}
        >
            {children}
        </ListItemContext.Provider>
        </>
     );
}
 
export default ListItemProvider;