import React from 'react';
import './App.css';
import Callapi from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormData from './Components/formData';
function App() {
  return (
    <Router>
    <div className="App">

      <Switch>
        <Route exact path='/form' component={FormData}></Route>
        <Route exact path="/">
        <Callapi />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
