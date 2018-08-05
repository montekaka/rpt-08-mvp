import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import $ from 'jquery';
import List from './components/List.jsx';
import Websites from './components/Websites.jsx';
import Search from './components/Search.jsx';
import Website from './components/Website.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      websites: []
    }
  }

  render () {
    return (
      <Router>
        <div>
          <h1>Item List</h1>
          <Route exact path="/" component={Search} ></Route>
          <Route exact path="/" component={Websites} ></Route>
          <Route path="/websites/:_id" component={Website} />     
        </div>        
      </Router>
)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));