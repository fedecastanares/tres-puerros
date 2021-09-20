import { useContext } from "react";
import { PersonalDataContext } from "../context/personalDataContext";

const usePersonalData = () => {

    const { data, setData } = useContext(PersonalDataContext)

    return {
        data, 
        setData
    };
}
 
export default usePersonalData;