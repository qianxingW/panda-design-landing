import { } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider  } from 'react-redux';

import store from './redux/store';

import Setting from './views/setting';

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/setting' Component={Setting}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
