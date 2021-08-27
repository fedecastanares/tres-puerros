import React, {createContext} from 'react';

export const BoxesContext = createContext();

const BoxesProvider = ({children}) => {

    let boxesList = [
        {
            name: "Caja basica",
            price: "550",
            items: [
                {
                    name: "Banana",
                    price: 500,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 88,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        },
        {
            name: "Caja avanzada",
            price: "650",
            items: [
                {
                    name: "Banana",
                    price: 50,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 6,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        },
        {
            name: "Caja premium",
            price: "950",
            items: [
                {
                    name: "Banana",
                    price: 50,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 6,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        },
        {
            name: "Caja total",
            price: "1250",
            items: [
                {
                    name: "Banana",
                    price: 50,
                    units: 0,
                    kg: 1
                },
                {
                    name: "Manzana",
                    price: 30,
                    units: 0,
                    kg: 3
                },
                {
                    name: "Pera",
                    price: 35,
                    units: 6,
                    kg: 0
                },
                {
                    name: "Mandarina",
                    price: 20,
                    units: 0,
                    kg: 1
                },
            ]
        }
    ];

    return ( 
        <>
        <BoxesContext.Provider 
            value={{
                boxesList
            }}
        >
            {children}
        </BoxesContext.Provider>
        </>
     );
}
 
export default BoxesProvider;