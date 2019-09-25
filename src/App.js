import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Login from './screen/Login'
import Home from './screen/Home'
import History from './screen/History'
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path={'/login/'} component={Login} exact />
        <Route path={'/'} component={Home} exact />
        <Route path={'/history'} component={History} exact />
      </Router>
    </Provider>
  );
}

export default App;
