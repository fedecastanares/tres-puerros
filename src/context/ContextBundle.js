import ListItemProvider from "./listItemContext"
import BoxesProvider from "./boxesContext"
import CartProvider from "./cartContext"
import PersonalDataProvider from "./personalDataContext"
import DataProvider from "./dataContext"

const ContextBundle = ({children}) => {
    return ( 
        <>
            <ListItemProvider>
                <BoxesProvider>
                    <CartProvider>
                        <PersonalDataProvider>
                            <DataProvider>
                                {children}
                            </DataProvider>
                        </PersonalDataProvider>
                    </CartProvider>
                </BoxesProvider>
            </ListItemProvider>
        </>
     );
}
 
export default ContextBundle;