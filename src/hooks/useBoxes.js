import { useContext, useState } from "react";
import { BoxesContext } from "../context/boxesContext";

const useBoxes = () => {

    const { boxesList } = useContext(BoxesContext);

    const addActiveAtribute = (array) => {
        let newArray = [];
        array.map(element => {
            let newItems = [];
            element.items.map(item => {
                newItems.push({...item, active: true});
                return null;
            })
            newArray.push({...element, items: newItems, activeItems: 0});
            return null;
        })
        return newArray
    }

    const boxesListStateINIT = addActiveAtribute(boxesList);

    const [ boxesListState, setBoxesListState ] = useState(boxesListStateINIT);

    return {
        boxesListState,
        setBoxesListState
    };
}
 
export default useBoxes;