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
			<div className="card">
				<img className="card-img-top" src={this.state.website.imageUrl} />
				<div className="card-body">
					<h5 className="card-title">{this.state.website.name}</h5>
					 <p className="card-text">{this.state.website.description}</p>
					 <Link to={this.state.linkTo} className="btn btn-primary">Reviews</Link>	
				</div>				
			</div>
		)
	}
}

export default WebsiteItem;