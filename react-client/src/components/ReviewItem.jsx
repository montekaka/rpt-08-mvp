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
			<div>
				{this.state.review.text}
			</div>
		)
	}
}

export default ReviewItem;