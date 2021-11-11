import { useContext, useState, useEffect } from "react";
import { BoxesContext } from "../context/boxesContext";

const useBoxes = () => {

    const { boxesList, setBoxesList } = useContext(BoxesContext);
    const [boxesListState, setBoxesListState] = useState({});

    const addActiveAtribute = (array) => {
        let newArray = [];
        array.map(element => {
            let newItems = [];
            if (element.items.length > 0) {
                element.items.map(item => {
                    newItems.push({ ...item, active: true });
                    return null;
                })
                newArray.push({ ...element, items: newItems, activeItems: 0, aggregates: [] });
            } else {
                newArray.push({ ...element, items: [], activeItems: 0, aggregates: [] })
            }
            return null;
        })
        return newArray;
    }

    useEffect(() => {
        if ( !!boxesList && boxesList.length > 0) {
            const boxesListState = addActiveAtribute(boxesList);
            setBoxesListState(boxesListState);
        }
    }, [boxesList])

    return {
        boxesList,
        boxesListState,
        setBoxesListState,
        setBoxesList
    };
}

export default useBoxes;