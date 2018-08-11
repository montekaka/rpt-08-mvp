import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Reviews from './reviews.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';


class Website extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			websiteId: '',
			website: '',
			editUrl: '',
			rating: 0
		}

		this.updateWebsiteRating = this.updateWebsiteRating.bind(this);
	}

	componentDidMount() {
		var _id = this.props.match.params._id;
		this.setState({websiteId: _id});
		this.setState({editUrl: '/website/'+_id+'/edit'});
		this.setPage(_id, (data) => {
			this.setState(data);
			var rating = 0;
			if( this.state.website.countReviews > 0) {
				rating = this.state.website.totalScore / this.state.website.countReviews;
			}
			console.log(rating);
			this.setState({rating: rating});
		});
		//this.setState({_id: _id});
	}

	componentWillReceiveProps(newProps) {
		var _id = newProps.match.params._id;
		this.setState({websiteId: _id});
		this.setState({editUrl: '/website/'+_id+'/edit'});
		this.setPage(_id, (data) => {
			this.setState(data);
			var rating = 0;
			if( this.state.website.countReviews > 0) {
				rating = this.state.website.totalScore / this.state.website.countReviews;
			}
			this.setState({rating: rating});			
		});		
	}

	setPage(id, callback){
		var baseUrl = '/api/websites/'+id+'.json';
		$.ajax({
			url: baseUrl,
			success: (data) => {
				//callback(JSON.parse(data))
				callback(data);
			}, error: (err) => {
				console.log('err', err)
			}			
		});
	}

	updateWebsiteRating(website){
		this.setState({website: website});
		var rating = 0;
		if( this.state.website.countReviews > 0) {
			rating = this.state.website.totalScore / this.state.website.countReviews;
		}
		this.setState({rating: rating});		
	}

	render() {
		return (
			<span>
	      <div className="jumbotron">
					<div className="container">
						<h1 className="display-3">{this.state.website.name}</h1>
						<p>{this.state.website.description}</p>
						<p>Total reviews: {this.state.website.countReviews}</p>
						<div>
							<p>Average rating: {this.state.rating.toFixed(2)}</p>
							<StarRatings numberOfStars={5} name = 'rating' starDimension="20px" starSpacing="1px" rating = {this.state.rating} starRatedColor="rgb(230, 67, 47)"></StarRatings>
						</div>						
						<div>
							<Link to={this.state.editUrl}>Edit</Link>
						</div>
					</div>
	      </div>			
				<Reviews website={this.state.website} updateWebsiteRating={this.updateWebsiteRating}></Reviews>
			</span>
		)
	}
}

export default Website;