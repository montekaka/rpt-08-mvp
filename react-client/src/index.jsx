import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Websites from './components/Websites.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      websites: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/api/websites', 
      success: (data) => {
        this.setState({
          websites: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <Websites websites={this.state.websites}></Websites>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));