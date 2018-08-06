import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewNew from './ReviewNew.jsx';

class Reviews extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: props.website,
			reviews: ''
		}
	}

	componentWillReceiveProps(nextProps) {
	  this.setState({ website: nextProps.website });  
	}

	render() {
		return(
			<div>
				<ReviewNew website={this.state.website}></ReviewNew>
			</div>
		)
	}

}

export default Reviews;