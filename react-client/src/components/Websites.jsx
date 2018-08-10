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
						<h1 className="display-3">Welcome to IMDb for Web app</h1>
						<p>Grade and review your favorite Web app</p>
						<p>Total {this.state.websites.length} websites</p>						
					</div>
				</div>							
				<div className="container">
					<div className="card-columns">
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