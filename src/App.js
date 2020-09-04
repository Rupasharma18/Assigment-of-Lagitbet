import React from 'react';
import './App.css';
import Callapi from './Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormData from './Components/categories';
function App() {
  return (
    <Router>
    <div className="App">

      <Switch>
        <Route exact path='/category' component={FormData}></Route>
        <Route exact path="/">
        <Callapi />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
