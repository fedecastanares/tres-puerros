import { useEffect } from 'react';
import { TextField, Grid, Typography, Radio, FormControlLabel, RadioGroup, InputLabel, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MoneyIcon from '@material-ui/icons/Money';

import usePersonalData from '../hooks/usePersonalData';

const useStyles = makeStyles((theme) => ({
    mb: {
        padding: '0.5rem 0',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        borderRadius: 5
    },
    select: {
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            maxWidth: "40vw"
        }
    },
    payment: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column"
        }
    }
}));

const Form = () => {
    const classes = useStyles();
    const { data, setData } = usePersonalData();

    useEffect(() => {
        setData({...data, day: ""});
    // eslint-disable-next-line
    }, [data.zone])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Grid container>
                <Grid item className={classes.mb} xs={12}>
                    <Typography variant="h5" component="h5">Datos personales:</Typography>
                </Grid>
                <Grid item className={classes.mb} xs={12}>
                    <TextField name="name" fullWidth label="Nombre" variant="standard" value={data.name} onChange={handleChange} />
                </Grid>
                <Grid item className={classes.mb} xs={12}>
                    <TextField name="phone" fullWidth label="Telefono" variant="standard" type="tel" pattern="[0-9]{9}" value={data.phone} onChange={handleChange} />
                </Grid>
                <Grid item className={classes.mb} xs={12}>
                    <TextField name="location" fullWidth label="Direccion" variant="standard" value={data.location} onChange={handleChange} />
                </Grid>
                <Grid item className={classes.mb} xs={12}>
                    <TextField multiline rows={3} name="aclaraciones" fullWidth label="Aclaraciones" variant="standard" value={data.aclaraciones} onChange={handleChange} />
                </Grid>
                <Grid item className={classes.mb} xs={12}>
                    <Grid container alignItems="center" justifyContent="space-evenly">
                        <Grid item xs={6}>
                            <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                            <Select
                                labelId="zone-select-label"
                                id="zone-select"
                                value={data.zone}
                                label="Zona"
                                onChange={handleChange}
                                name="zone"
                                className={classes.select}
                            >
                                <MenuItem value={"A"}>La Blanqueada - Malvin - <br />Carrasco - Parque Miramar</MenuItem>
                                <MenuItem value={"B"}>Punta Carretas - Pocitos - <br />Villa Dolores - Buceo </MenuItem>
                                {/* <MenuItem value={"C"}>Parque Rod?? - Cordon - Centro - <br />Ciudad Vieja</MenuItem>*/}
                                <MenuItem value={"L"}>Local (take away)</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <RadioGroup
                                aria-label="day"
                                defaultValue={""}
                                name="day-radio-buttons-group"
                                style={{ flexDirection: "row", marginLeft: "1rem", marginTop: "0.8rem" }}
                                value={data.day}
                                onChange={(e) => setData({...data, day: e.target.value})}
                            >
                                {data.zone === "A" &&
                                    <>
                                        <FormControlLabel value="Martes" control={<Radio color="primary" />} label="Martes" />
                                        <FormControlLabel value="Viernes" control={<Radio color="primary" />} label="Viernes" />
                                    </>
                                }
                                {data.zone === "B" &&
                                    <>
                                        <FormControlLabel value="Martes" control={<Radio color="primary" />} label="Martes" />
                                        <FormControlLabel value="Miercoles" control={<Radio color="primary" />} label="Miercoles" />
                                        <FormControlLabel value="Viernes" control={<Radio color="primary" />} label="Viernes" />
                                    </>
                                }
                                {/*data.zone === "C" &&
                                    <>
                                        <FormControlLabel value="Jueves" control={<Radio color="primary" />} label="Jueves" />
                                    </>
                                */}
                                {data.zone === "L" &&
                                    <>
                                        <FormControlLabel value="Martes" control={<Radio color="primary" />} label="Martes" />
                                        <FormControlLabel value="Miercoles" control={<Radio color="primary" />} label="Miercoles" />
                                        <FormControlLabel value="Viernes" control={<Radio color="primary" />} label="Viernes" />
                                    </>
                                }
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.mb} xs={12}>
                    <Grid container alignItems="center" justifyContent="space-evenly" className={classes.payment}>
                        <Grid item >
                            <Grid container justifyContent="space-evenly">
                                <AccountBalanceIcon />
                                <MoneyIcon />
                            </Grid>
                            <Typography component="p" variant="body1" style={{margin: "0.5rem 0", fontWeight: "bold"}}>Medio de pago:</Typography>
                        </Grid>
                        <Grid item >
                            <RadioGroup
                                aria-label="paymentMethod"
                                defaultValue="cash"
                                name="paymentMethod-radio-buttons-group"
                            >
                                <FormControlLabel value="transfer" control={<Radio color="primary" />} label="Transferencia Bancaria" />
                                <FormControlLabel value="cash" control={<Radio color="primary" />} label="Efectivo" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Form;