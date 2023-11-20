import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainContainer from './containers/MainContainer';
import Login from './components/Login';

function App() {
  return (
    <div>

      <BrowserRouter>

        <Switch>
          <Route exact path="/" component={() => {

            // TEST USER 

            return (

              <React.Fragment>
                <MainContainer />
              </React.Fragment>

            )
          }} />

          <Route exact path="/login" component={() => {
            return (

              <React.Fragment>
                <Login />
              </React.Fragment>

            )
          }} />


          <Route path="/test/" component={(props) => {
            return (
              <React.Fragment>
                Hello
              </React.Fragment>
            )
          }} />

          <Redirect to="/" />
        </Switch>


      </BrowserRouter>

    </div>
  );
}

export default App;