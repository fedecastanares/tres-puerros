import React, {createContext, useEffect, useState} from 'react';
import UserService from "../services/UserService"

export const BoxesContext = createContext();

const BoxesProvider = ({children}) => {

    const [boxesList, setBoxesList] = useState([]);

    const getBoxesList = async () => {
        const userService = new UserService();
        const boxes = await userService.getBoxes();
        setBoxesList(boxes);
    } 

    useEffect(() => {
        getBoxesList();
    }, [])


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