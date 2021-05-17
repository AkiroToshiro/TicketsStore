import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Login from './login/Login'
import Register from "./register/Register";
import Forgot from "./forgot/Forgot";
import Main from "./main/Main";
import Profile from "./profile/Profile";
import Event from "./event/Event";
import Tickets from "./tickets/tickets";

function App() {
  return (
      <div>
      <Router>
        <Switch>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/forgot'>
                <Forgot />
            </Route>
            <Router path='/main'>
                <Main/>
            </Router>
            <Router path='/profile'>
                <Profile />
            </Router>
            <Router path='/event'>
                <Event />
            </Router>
            <Router path='/tickets'>
                <Tickets />
            </Router>
        </Switch>
      </Router>
      </div>
  )
}

export default App;
