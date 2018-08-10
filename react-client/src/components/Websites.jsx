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
			<span>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-3">Hello, world!</h1>
						<p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
						<p>Total reviews {this.state.websites.length}</p>						
					</div>
				</div>							
				<div className="container">
					<div className="row">
						{
							this.state.websites.map( website => <WebsiteItem website={website} key={'website'+website._id}></WebsiteItem>)
						}		
					</div>			
				</div>
			</span>		
		)
	}
}

export default Websites;