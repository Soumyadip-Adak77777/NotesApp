import React from "react";
import SLogin from './Components/auth/SLogin';
import TLogin from './Components/auth/TLogin';
import SRegister from './Components/auth/SRegister';
import TRegister from './Components/auth/TRegister';
import ErrorPage from './Components/ErrorPage';
import { Route,Switch } from 'react-router-dom';
import SDashboard from "./Components/SDashboard";
import TDashboard from "./Components/TDashboard";
import ProtectedRoute from './ProtectedRoute/protectedRoute'
import ADashboard from "./Components/ADashboard";
import ALogin from "./Components/auth/ALogin";



function App() {

  return (
    <>
    <Switch>
          <ProtectedRoute path="/sdashboard" component={SDashboard}/>
          <ProtectedRoute path="/tdashboard" component={TDashboard}/>
          <ProtectedRoute exact path="/adminSpecialCharacterURL" component={ADashboard}/>
          <Route exact path="/adminlogin" component={ALogin}/>
          <Route exact path="/" component={SLogin}/>
          <Route  path="/tlogin" component={TLogin}/>
          <Route  path="/slogin" component={SLogin}/>
          <Route  path="/tregister" component={TRegister}/>
          <Route  path="/sregister" component={SRegister}/>
          <Route  path="*" component={ErrorPage}/>
    </Switch>    
      
    </>
  );
}

export default App;
