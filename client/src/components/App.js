import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import * as actions from '../actions/index'

import Header from "./Header";
import Landing from './Landing';

const Dashboard = () => {
  return <h1>Dashboard</h1>
};

function App(props) {


  useEffect( () => {
    props.fetchUser();
  },[props]);


  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/home" exact component={Dashboard} />
        </div>
      </BrowserRouter>

    </div>
  );
}

export default connect(null, actions)(App);
