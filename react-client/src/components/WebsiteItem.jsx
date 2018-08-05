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
			linkTo: '/websites/'+props.website.url
		}
	}

	render() {
		return (
			<div>
				<Link to={this.state.linkTo} >{this.state.website.url}</Link>	
			</div>
		)
	}
}

export default WebsiteItem;