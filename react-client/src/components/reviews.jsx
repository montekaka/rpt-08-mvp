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
			reviews: []
		}

		this.handleNewReview = this.handleNewReview.bind(this);
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
				console.log('success', JSON.parse(data));
				this.setState({reviews: JSON.parse(data)});
			}, error: (err) => {
				console.log('err', err);
			}			
		})	  
	}

	handleNewReview(review) {		
		var reviews = this.state.reviews;
		reviews.unshift(JSON.parse(review).review);
		this.setState({reviews: reviews});
	}

	render() {
		return(
			<main role="main" className="container">
				<div className="row">
					<div className="col-md-8 blog-main">
						<h3 className="pb-3 mb-4 font-italic border-bottom">
	            Reviews
	          </h3>					
						{					
							this.state.reviews.map((review) => <ReviewItem review={review} key={review._id}></ReviewItem>)					
						}								
					</div>		
					<ReviewNew website={this.state.website} handleNewReview = {this.handleNewReview}></ReviewNew>
				</div>			
			</main>
		)
	}

}

export default Reviews;