import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import $ from 'jquery';
import List from './components/List.jsx';
import Navbar from './components/Navbar.jsx'
import Websites from './components/Websites.jsx';
import Website from './components/Website.jsx';
import WebsiteEdit from './components/WebsiteEdit.jsx';

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
        <span>
          <Route exact path="*" component={Navbar} ></Route>
          <main role="main">
            <Route exact path="/" component={Websites} ></Route>
            <Route path="/websites/:_id" component={Website} />
            <Route path="/website/:_id/edit" component={WebsiteEdit} />
          </main>
        </span>        
      </Router>
)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));