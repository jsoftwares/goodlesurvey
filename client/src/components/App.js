import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import * as actions from '../actions/index'

import Header from "./Header";
import Landing from './Landing';
import Dashboard from './Dashboard';

function App(props) {


  useEffect( () => {
    props.fetchUser();
  },[props]);


  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Dashboard} />
        </div>
      </BrowserRouter>

    </div>
  );
}

export default connect(null, actions)(App);
