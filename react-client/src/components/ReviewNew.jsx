import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: '',
			review: '',
			rating: 0,
			text: '',
			screenname: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	componentWillReceiveProps(nextProps) {
	  this.setState({ website: nextProps.website });  
	}	

	handleChange(event){
		this.setState({text: event.target.value});
	}

	handleSubmit(event){
		var text = this.state.text;
		var handleNewReview = this.props.handleNewReview;
		var review = {text: text, website: this.state.website._id}		
		event.preventDefault();
		$.ajax({
			type: "POST",
			url: '/api/reviews/new',
			dataType: 'text',
			data: JSON.stringify({review: review}),
			contentType: 'application/json', 
			success: (data) => {
				console.log('success', data);
				handleNewReview(data);
			},
			error: (err) => {
				console.log('err', err);
			}
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Write your review</label>
					<input type="text" value= {this.state.text} onChange={this.handleChange} />							
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}

export default ReviewNew;