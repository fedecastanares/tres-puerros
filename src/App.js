import Theme from './theme/config'
import Layout from './components/layout'


import ContextBundle from './context/ContextBundle'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Index from './pages/index'
import Cart from './pages/Cart'


function App() {
  return (
    <>
      <ContextBundle>
        <Theme>
          <Router>
            <Switch>
              <Layout >
                <Route exact path='/' component={Index} />
                <Route exact path='/carrito' component={Cart} />
              </Layout>
            </Switch>
        </Router>
        </Theme>
      </ContextBundle>
    </>
  );
}

export default App;
