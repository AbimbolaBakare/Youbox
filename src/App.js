import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { WatchVideo } from './pages/WatchVideo';
import { history } from './redux/store/history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/watch/:slug" exact component={WatchVideo} />
        </Switch>
      </Router>
      <ToastContainer />
    </div>

  );
}

export default App;
