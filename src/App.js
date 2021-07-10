import React from 'react';
//components
import EditProfile from './components/EditProfile';
import LogIn from './components/LogIn';
import DashBoard from './components/DatshBoard';
import SingUp from './components/SingUp'
import './app.css'
//router
import { Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ReserPassowrd from './components/ReserPassword';

function App() {
  return (
    <>
      <Switch>
        <PrivateRoute exact path='/' component={DashBoard}/>
        <PrivateRoute path='/edit-profile' component={EditProfile} />
        <Route path='/signup' component={SingUp}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/reset-password' component={ReserPassowrd}/>
      </Switch>
    </>
  );
}

export default App;
