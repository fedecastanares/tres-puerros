import React, {createContext} from 'react';

export const ListItemContext = createContext();

const ListItemProvider = ({children}) => {

    const priceList = [
        {
            name: "Banana",
            price: 50,
            unitWeightGR: 200
        },
        {
            name: "Manzana",
            price: 20,
            unitWeightGR: 100
        },
        {
            name: "Pera",
            price: 40,
            unitWeightGR: 250
        },
        {
            name: "Kiwi",
            price: 90,
            unitWeightGR: 200
        }
    ];
    

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