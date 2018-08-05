import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Website extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: ''
		}
	}

	render() {
		return (
			<div>Hello World</div>
		)
	}
}

export default Website;