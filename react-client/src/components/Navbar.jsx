import React from 'react';
import Search from './Search.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//<Route exact path="/" component={Search} ></Route>

class Navbar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link to="/" className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
          </ul>
          <Search></Search>
        </div>
      </nav>
    )
  }   
}

export default Navbar;