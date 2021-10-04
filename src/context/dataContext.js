import React, {createContext, useState} from 'react';
import {isUserAuthenticated} from '../utils/localstorage'

export const DataContext = createContext();

const DataProvider = ({children}) => {

    const [auth, setauth] = useState(false);
    const [error, setError] = useState(false);


    return(
        <DataContext.Provider
            value={{
                auth,
                error,
                setauth,
                setError
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;