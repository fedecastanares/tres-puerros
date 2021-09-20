import Theme from './theme/config'
import Layout from './components/layout'


import ContextBundle from './context/ContextBundle'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Index from './pages/index'
import Cart from './pages/Cart'
import ThankYou from './pages/ThankYou';


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
                <Route exact path='/thankyou' component={ThankYou} />
              </Layout>
            </Switch>
        </Router>
        </Theme>
      </ContextBundle>
    </>
  );
}

export default App;
