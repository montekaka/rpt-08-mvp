import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewNew from './ReviewNew.jsx';
import ReviewItem from './ReviewItem.jsx'

class Reviews extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: props.website,
			reviews: ''
		}
	}

	componentDidMount() {
		
	}

	componentWillReceiveProps(nextProps) {
	  this.setState({ website: nextProps.website });  
	}

	render() {
		return(
			<div>
				<ReviewNew website={this.state.website}></ReviewNew>
				<ReviewItem></ReviewItem>
			</div>
		)
	}

}

export default Reviews;