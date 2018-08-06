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

	componentWillReceiveProps(nextProps) {
	  this.setState({ website: nextProps.website }); 
	  // get reviews 
		$.ajax({
			type: 'POST',
			url: '/api/website/reviews.json',
			dataType: 'text',
			data: JSON.stringify({websiteId: nextProps.website._id}),
			contentType: 'application/json',  
			success: (data) => {
				console.log('success',data);
			}, error: (err) => {
				console.log('err', err);
			}			
		})	  
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