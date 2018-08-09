import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			review: props.review
		}	
	}	
	
	render() {
		return (
			<div className="blog-post">
			 	<h2 className="blog-post-title">user name</h2>
			 	<div>Stars</div>
			 	<p className="blog-post-meta">January 1, 2014</p>			 	 
			 	<p>{this.state.review.text}</p>			
			</div>
		)
	}
}

export default ReviewItem;