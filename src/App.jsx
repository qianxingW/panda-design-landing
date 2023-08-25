import { } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider  } from 'react-redux';

import store from './redux/store';

import Setting from './views/setting';
import Preview from './views/preview';

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/setting' Component={Setting}></Route>
          <Route path='/preview' Component={Preview}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
