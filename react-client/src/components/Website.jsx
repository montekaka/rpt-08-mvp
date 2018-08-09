import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Reviews from './reviews.jsx';

class Website extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: ''
		}
	}

	componentDidMount() {
		var _id = this.props.match.params._id;
		this.setPage(_id, (data) => {
			this.setState(data);
		});
		//this.setState({_id: _id});
	}

	componentWillReceiveProps(newProps) {
		var _id = newProps.match.params._id;
		this.setPage(_id, (data) => {
			this.setState(data);
		});		
	}

	setPage(id, callback){
		var baseUrl = '/api/websites/'+id+'.json';
		$.ajax({
			url: baseUrl,
			success: (data) => {
				//callback(JSON.parse(data))
				console.log(data)
				callback(data);
			}, error: (err) => {
				console.log('err', err)
			}			
		});
	}

	render() {
		return (
			<span>
	      <div className="jumbotron">
					<div className="container">
						<h1 className="display-3">{this.state.website.name}</h1>
						<p>TOTAL REVIEWS</p>
						<p>STARS</p>
					</div>
	      </div>			
				<Reviews website={this.state.website}></Reviews>
			</span>
		)
	}
}

export default Website;