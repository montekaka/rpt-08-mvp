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
				console.log('success',data);
			}, error: (err) => {
				console.log('err', err);
			}			
		})
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Search Product</label>
				<input type="text" value={this.state.searchKeyword} onChange={this.handleChange} />											
				<input type="submit" value="Submit" />
			</form>
		)
	}

}

export default Search;