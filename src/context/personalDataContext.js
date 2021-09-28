import React, {createContext, useState} from 'react';

export const PersonalDataContext = createContext();

const PersonalDataProvider = ({children}) => {

    const [data, setData ] = useState({
        name: "",
        phone: "",
        location: "",
        aclaraciones: "",
        zone:"B",
        paymentMethod: "cash"
    });

    return ( 
        <>
        <PersonalDataContext.Provider 
            value={{
                data,
                setData
            }}
        >
            {children}
        </PersonalDataContext.Provider>
        </>
     );
}
 
export default PersonalDataProvider;