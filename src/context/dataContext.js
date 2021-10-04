import React, {createContext, useState} from 'react';


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