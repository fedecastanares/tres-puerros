import Theme from './theme/config'
import Layout from './components/layout'


import ContextBundle from './context/ContextBundle'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Index from './pages/index'
import Cart from './pages/Cart'
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import PrivateRoute from './components/privateRoute';
import Admin from "./pages/Admin"
import Orders from "./pages/Orders"
import Order from "./pages/Order"


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
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path="/admin" component={Admin} />
                <PrivateRoute exact path="/orders" component={Orders} />
                <PrivateRoute exact path="/order/:id" component={Order} />
              </Layout>
            </Switch>
        </Router>
        </Theme>
      </ContextBundle>
    </>
  );
}

export default App;
