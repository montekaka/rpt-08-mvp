import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import $ from 'jquery';
import Website from './Website.jsx';

class WebsiteItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: props.website,
			linkTo: '/websites/'+props.website._id
		}
	}

	render() {
		return (
			<div className="col-md-4">
				<h2>{this.state.website.url}</h2>
				<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
				<Link to={this.state.linkTo} className="btn btn-secondary">Reviews</Link>	
			</div>
		)
	}
}

export default WebsiteItem;