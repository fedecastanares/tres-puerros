import React , {useContext} from 'react';
import Alert from '@material-ui/lab/Alert';
import {DataContext} from '../context/dataContext'

const Message = () => {

    const {error} = useContext(DataContext);
    const {severity, message} = error
    return ( 
        <>
            <div style={{height: 42, margin: 10}}>
                {error && 
                    <Alert severity={severity}>{message}</Alert>}
            </div>
        </>
     );
}
 
export default Message;