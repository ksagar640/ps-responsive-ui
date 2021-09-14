import React from 'react';
import Navbar from '../NavBar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import apiConfiguration from '../../pages/apiConfiguration';
import usersManagement from '../../pages/usersManagement';
import nightlyBatchProcess from '../../pages/nightlyBatchProcess';


function AdminScreen() {
  return (
    <>
      <Router>
         <Navbar /> 
        <Switch>
    
          <Route path='/apiConfig' exact component={apiConfiguration} />
          <Route path='/usersManagement' component={usersManagement} />
          <Route path='/nightlyBatchProcess' component={nightlyBatchProcess} />
        </Switch>
      </Router>
    </>
  );
}

export default AdminScreen;



