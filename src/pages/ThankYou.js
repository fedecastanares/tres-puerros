import { Button, Typography, Grid, CardContent, Card } from "@material-ui/core";
import { Link } from 'react-router-dom';
import checkImg from '../assets/img/check.png'

const ThankYou = () => {
    return (
        <>
            <Grid container justifyContent='center' alignItems='center' style={{ minHeight: "90vh", flexDirection: "column" }}>
                <Card>
                    <CardContent>
                        <img style={{height: '5rem', width: "auto", margin: "0 25%"}} src={checkImg} alt='check' />
                        <Typography component="p" variant="body1" align="center">
                            Gracias por tu compra
                        </Typography>
                        <Link to="/">
                            <Button fullWidth>
                                Volver
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}

export default ThankYou;