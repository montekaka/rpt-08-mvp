import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class WebsiteItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: []
		}
	}

	render() {
		return (
			<div>Hello world</div>
			)
	}
}

export default WebsiteItem;