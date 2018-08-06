import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			review: ''
		}	
	}	

	render() {
		return (
			<div>
				hello world
			</div>
		)
	}
}

export default ReviewItem;