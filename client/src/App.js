import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Signup from './components/signup';
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li><Link to={'/'} className="nav-link"> Dashboard </Link></li>
        <li><Link to={'/signup'} className="nav-link">Signup</Link></li>
      </ul>
      </nav>
      <h3 className = "text-center mt-3">Ingenio CryptoStock App</h3>
      <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
