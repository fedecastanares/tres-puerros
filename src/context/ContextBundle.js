import ListItemProvider from "./listItemContext"
import BoxesProvider from "./boxesContext"
import CartProvider from "./cartContext"
import PersonalDataProvider from "./personalDataContext"

const ContextBundle = ({children}) => {
    return ( 
        <>
            <ListItemProvider>
                <BoxesProvider>
                    <CartProvider>
                        <PersonalDataProvider>
                            {children}
                        </PersonalDataProvider>
                    </CartProvider>
                </BoxesProvider>
            </ListItemProvider>
        </>
     );
}
 
export default ContextBundle;