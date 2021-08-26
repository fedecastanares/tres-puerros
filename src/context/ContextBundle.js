import ListItemProvider from "./listItemContext"
import BoxesProvider from "./boxesContext"
import CartProvider from "./cartContext"

const ContextBundle = ({children}) => {
    return ( 
        <>
            <ListItemProvider>
                <BoxesProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </BoxesProvider>
            </ListItemProvider>
        </>
     );
}
 
export default ContextBundle;