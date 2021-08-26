import Theme from './theme/config'

import Boxes from './components/boxes'
import Table from './components/table'
import Header from './components/header'

import ContextBundle from './context/ContextBundle'

import { Grid } from "@material-ui/core"

function App() {
  return (
    <>
      <ContextBundle>
        <Theme>
          <Header />
          <Grid container justifyContent='center'>
            <Grid item xs={11} sm={9} md={7} >
              <Boxes />
            </Grid>
            <Grid item xs={11} sm={9} md={7}>
              <Table />
            </Grid>
          </Grid>
        </Theme>
      </ContextBundle>
    </>
  );
}

export default App;
