import { TextField, Grid, Typography, Radio, FormControlLabel, RadioGroup, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MoneyIcon from '@material-ui/icons//Money';

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
                    <TextField name="phone" fullWidth label="Telefono" variant="standard" value={data.phone} onChange={handleChange} />
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
                                <MenuItem value={"C"}>Parque Rodó - Cordon - Centro - <br />Ciudad Vieja</MenuItem>
                                <MenuItem value={"L"}>Local</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <RadioGroup
                                aria-label="day"
                                defaultValue={"local"}
                                name="day-radio-buttons-group"
                                style={{ flexDirection: "row", marginLeft: "1rem", marginTop: "0.8rem" }}
                            >
                                {data.zone === "A" &&
                                    <>
                                        <FormControlLabel value="martes" control={<Radio color="primary" />} label="Martes" />
                                    </>
                                }
                                {data.zone === "B" &&
                                    <>
                                        <FormControlLabel value="martes" control={<Radio color="primary" />} label="Martes" />
                                        <FormControlLabel value="miercoles" control={<Radio color="primary" />} label="Miercoles" />
                                        <FormControlLabel value="jueves" control={<Radio color="primary" />} label="Jueves" />
                                    </>
                                }
                                {data.zone === "C" &&
                                    <>
                                        <FormControlLabel value="jueves" control={<Radio color="primary" />} label="Jueves" />
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