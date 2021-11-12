import React, { createContext, useEffect, useState } from 'react';
import useListItem from '../hooks/useListItem';
import UserService from "../services/UserService"

export const BoxesContext = createContext();

const BoxesProvider = ({ children }) => {

    const [boxesList, setBoxesList] = useState([]);

    const { priceList } = useListItem();

    useEffect(() => {
        const getBoxesList = async () => {
            if (priceList.length > 0) {
                const userService = new UserService();
                const boxes = await userService.getBoxes();
                setBoxesList(boxes);
            }
        }
        getBoxesList();
    }, [priceList])


    return (
        <>
            <BoxesContext.Provider
                value={{
                    boxesList,
                    setBoxesList
                }}
            >
                {children}
            </BoxesContext.Provider>
        </>
    );
}

export default BoxesProvider;