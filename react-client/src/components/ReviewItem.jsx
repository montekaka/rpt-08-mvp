import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';

class ReviewItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			review: props.review
		}
		this.createdDateMoment = this.createdDateMoment.bind(this);
	}	

	createdDateMoment() {
		var createDate = this.state.review.createdDate;
		return moment(createDate).fromNow();
	}
	
	render() {
		return (
			<div className="blog-post">
			 	<h2 className="blog-post-title">{this.state.review.screenname}</h2>
			 	<div>{this.state.review.rating} Stars</div>
			 	<p className="blog-post-meta">{this.createdDateMoment()}</p>			 	 
			 	<p>{this.state.review.text}</p>			
			</div>
		)
	}
}

export default ReviewItem;