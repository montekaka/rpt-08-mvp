import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Websites from './components/Websites.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      websites: []
    }
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <Search></Search>
      <Websites></Websites>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));