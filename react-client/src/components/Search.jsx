import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: '',
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
		$.ajax({
			type: 'POST',
			url: '/api/websites/new',
			dataType: 'text',
			data: JSON.stringify({url: url}),
			contentType: 'application/json',  
			success: (data) => {
				console.log('success set the website', data)				
				//var website = JSON.parse(data).website;
			}, error: (err) => {
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