import { TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import usePersonalData from '../hooks/usePersonalData';

const useStyles = makeStyles((theme) => ({
    mb: {
        marginBottom: '1rem',
    },
}));

const Form = () => {
    const classes = useStyles();
    const { data, setData } = usePersonalData();

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography className={classes.mb} variant="h5" component="h5">Datos personales:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.mb} name="name" fullWidth label="Nombre" variant="standard" value={data.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.mb} name="phone" fullWidth label="Telefono" variant="standard" value={data.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.mb} name="location" fullWidth label="Direccion" variant="standard" value={data.location} onChange={handleChange} />
                </Grid>
            </Grid>
        </>
    );
}

export default Form;