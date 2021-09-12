

const ItemCart = ({item}) => {
    console.log(item);
    return ( 
        <>
        {item.hasOwnProperty("items") ? 
        <>
        {`${item.name} ${item.price}`}
        <br/>
        Items:
        <br/>
        {item.items.map( itemV => itemV.active && `• ${itemV.name}`)}
        <br/>
        Agregados:
        <br/>
        {item.aggregates.map( itemV => `• ${itemV.product}`)}
        </>
        :
        <>
        </>}
        </>
     );
}
 
export default ItemCart;