import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			review: '',
			rating: 0,
			text: '',
			screenname: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleChange(event){
		this.setState({text: event.target.value});
	}

	handleSubmit(event){
		var text = this.state.text;
		event.preventDefault();
		console.log(text);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Write your review</label>
				<input type="text" value= {this.state.text} onChange={this.handleChange} />							
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

export default ReviewNew;