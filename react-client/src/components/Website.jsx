import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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

	setPage(id, callback) {
		$.ajax({
			type: 'POST',
			url: '/api/website.json',
			dataType: 'text',
			data: JSON.stringify({_id: id}),
			contentType: 'application/json',
			success: (data) => {
				callback(JSON.parse(data))
			}, error: (err) => {
				console.log('err', err)
			}
		})
	}

	render() {
		return (
			<div>Welcome to {this.state.website.url}</div>
		)
	}
}

export default Website;