import React, {createContext} from 'react';

export const BoxesContext = createContext();

const BoxesProvider = ({children}) => {
    return ( 
        <>
        <BoxesContext.Provider 
            value={{

            }}
        >
            {children}
        </BoxesContext.Provider>
        </>
     );
}
 
export default BoxesProvider;