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
		console.log(this.state.searchKeyword);
		event.preventDefault();
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Search Product
					<input type="text" searchKeyword={this.state.searchKeyword} onChange={this.handleChange}/>							
				</label>
				<input type="submit" value="Submit" />
			</form>
		)
	}

}

export default Search;