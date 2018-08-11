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
		this.handleUserNameChange = this.handleUserNameChange.bind(this);		
		this.handleRatingChange = this.handleRatingChange.bind(this);		
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	componentWillReceiveProps(nextProps) {
	  this.setState({ website: nextProps.website });  
	}	

	handleChange(event){
		this.setState({text: event.target.value});
	}

	handleUserNameChange(event){
		this.setState({screenname: event.target.value});
	}	

	handleRatingChange(event){
		this.setState({rating: event.target.value});
	}	

	handleSubmit(event){
		var text = this.state.text;
		var handleNewReview = this.props.handleNewReview;
		var review = {text: text, website: this.state.website._id, rating: this.state.rating, screenname: this.state.screenname}		
		event.preventDefault();
		$.ajax({
			type: "POST",
			url: '/api/reviews/new',
			dataType: 'text',
			data: JSON.stringify({review: review}),
			contentType: 'application/json', 
			success: (data) => {
				handleNewReview(data);
				this.setState({text: '', screenname: '', rating: 0});
			},
			error: (err) => {
				console.log('err', err);
			}
		});
	}

	render() {
		return (
			<div className="col-md-4">
				<h4 className="font-italic">Submit your review</h4>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
					 	<label>Username</label>
						<input type="text" className="form-control" value= {this.state.screenname} onChange={this.handleUserNameChange} />							
					</div>
					<div className="form-group">
					 	<label>Stars</label>
						<input type="number" className="form-control" value= {this.state.rating} onChange={this.handleRatingChange} />
					</div>	
					<div className="form-group">
					 	<label>Review</label>
						<textarea type="text" className="form-control" value= {this.state.text} onChange={this.handleChange} rows="3"></textarea>							
					</div>															
					<input type="submit" value="Submit" className="btn btn-primary"/>
				</form>
			</div>
		)
	}
}

export default ReviewNew;