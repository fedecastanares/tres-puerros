import Boxes from '../components/boxes'
import Table from '../components/table'

import { Grid } from "@material-ui/core"

const Index = () => {
    return (
        <>
            <Grid container justifyContent='center'>
                <Grid item xs={12} sm={9} md={7} >
                    <Boxes />
                </Grid>
                <Grid item xs={12} sm={9} md={7}>
                    <Table />
                </Grid>
            </Grid>
        </>
    );
}

export default Index;