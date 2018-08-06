import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			review: '',
			stars: 0,
			text: '',
			screenname: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleChange(){

	}

	handleSubmit(){

	}

	render() {
		return (
			<div>Hello world</div>
		)
	}
}

export default ReviewNew;