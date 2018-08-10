import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import $ from 'jquery';

class WebsiteEdit extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: '',
			websiteId: '',
			linkTo: ''
		}
	}

	componentDidMount() {
		var _id = this.props.match.params._id;
		console.log(_id);
	}

	render() {
		return(
			<div>Hello world</div>
		)
	}
}

export default WebsiteEdit;