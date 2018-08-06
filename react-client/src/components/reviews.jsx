import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewNew from './ReviewNew.jsx';

class Reviews extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			reviews: ''
		}
	}

	render() {
		return(
			<ReviewNew></ReviewNew>
		)
	}

}

export default Reviews;