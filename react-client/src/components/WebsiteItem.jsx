import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class WebsiteItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: props.website
		}
	}

	render() {
		return (
			<div>{this.state.website.url}</div>
		)
	}
}

export default WebsiteItem;