import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			toWebsite: false,
			websiteId: '',
			searchKeyword: '' // for now we are accepting only URL e.g. https://www.dropbox.com
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		this.setState({searchKeyword: event.target.value});	
	}

	handleSubmit(event) {
		var url = this.state.searchKeyword;
		event.preventDefault();
		var handleSubmitted = this.props.handleSubmitted;
		$.ajax({
			type: 'POST',
			url: '/api/websites/new',
			dataType: 'text',
			data: JSON.stringify({url: url}),
			contentType: 'application/json',  
			success: (data) => {
				var data = JSON.parse(data);
				this.setState({searchKeyword: ''});
				this.setState({websiteId: data.websiteId});
				this.setState({toWebsite: true});
				var redirectUrl = '/websites/'+data.websiteId;	
				handleSubmitted(redirectUrl);
				//var website = JSON.parse(data).website;
			}, error: (err) => {
				this.setState({toWebsite: false});
				console.log('err', err);
			}			
		})
	}
	render(){
		return (
			<form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
				<input className="form-control mr-sm-2" type="text" value={this.state.searchKeyword} onChange={this.handleChange} />											
				<button type="submit" className="btn btn-outline-success my-2 my-sm-0">Search</button>
			</form>
		)
	}

}

export default Search;