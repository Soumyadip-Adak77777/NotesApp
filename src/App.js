import React from "react";

import SLogin from './Components/auth/SLogin';
import TLogin from './Components/auth/TLogin';
import SRegister from './Components/auth/SRegister';
import TRegister from './Components/auth/TRegister';
// import ErrorPage from './Components/ErrorPage';
import { Route } from 'react-router-dom';


function App() {
  return (
    <>
      
          <Route exact path="/" component={SLogin}/>
          <Route  path="/tlogin" component={TLogin}/>
          <Route  path="/slogin" component={SLogin}/>
          <Route  path="/tregister" component={TRegister}/>
          <Route  path="/sregister" component={SRegister}/>
          
        
      
    </>
  );
}

export default App;
