import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WebsiteItem from './WebsiteItem.jsx';

class Websites extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			websites: []
		}
	}

  componentDidMount() {
    $.ajax({
      url: '/api/websites.json', 
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

	render(){
		return (
			<div>
				<div>{this.state.websites.length}</div>
				{
					this.state.websites.map( website => <WebsiteItem website={website} key={website.url}></WebsiteItem>)
				}	
			</div>		
		)
	}
}

export default Websites;