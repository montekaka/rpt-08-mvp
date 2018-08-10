import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import $ from 'jquery';

class WebsiteEdit extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: '',
			websiteId: '',
			redirectUrl: '',
			url:'',
			imageUrl:'',
			name: '',
			description: ''
		}

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeUrl = this.handleChangeUrl.bind(this);
		this.handleChangeImageUrl = this.handleChangeImageUrl.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleChangeName(event) {
		this.setState({name: event.target.value});				
	}

	handleChangeUrl(event) {
		this.setState({url: event.target.value});
	}

	handleChangeDescription(event) {
		this.setState({description: event.target.value});
	}

	handleChangeImageUrl(event) {
		this.setState({imageUrl: event.target.value});
	}			

	componentDidMount() {
		var _id = this.props.match.params._id;
		this.setState({websiteId: _id});
		this.setPage(_id, (data) => {
			this.setState(data);
			this.setState({url: data.website.url});
			this.setState({imageUrl: data.website.imageUrl});
			this.setState({name: data.website.name});
			this.setState({description: data.website.description});
		});
	}

	setPage(id, callback) {
		var redirectUrl = '/websites/'+id;
		this.setState({redirectUrl: redirectUrl});
		var baseUrl = '/api/websites/'+id+'.json';
		$.ajax({
			url: baseUrl,
			success: (data) => {
				callback(data);
			}, error: (err) => {
				console.log('err', err)
			}			
		});
	}	


	handleUpdate(){
		this.state.website.url = this.state.url;
		this.state.website.imageUrl = this.state.imageUrl;
		this.state.website.name = this.state.name;
		this.state.website.description = this.state.description;
		var website = this.state.website;
		var redirectUrl = this.state.redirectUrl;
		//console.log(website);
		$.ajax({
			type: 'POST',
			url: '/api/website/edit',
			dataType: 'text',
			data: JSON.stringify({website: website}),
			contentType: 'application/json', 
			success: (data) => {
				console.log('success', data);
				//handleNewReview(data);
				this.props.history.push(redirectUrl);
			},
			error: (err) => {
				console.log('err', err);
			}			
		})
	}

	render() {
		return(
			<span>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-3">Edit</h1>
					</div>
				</div>				
				<div className="container">
					<div className="col-md-12">
						<h4 className="mb-3">Website Info</h4>
						<form>
							<div className="row">
								<div className="col-md-4 mb-3">
									<label htmlFor="name">Name</label>
									<input type="text" className="form-control" id="name" placeholder="" value= {this.state.name} onChange={this.handleChangeName} />
								</div>
								<div className="col-md-4 mb-3">
									<label htmlFor="url">URL</label>
									<input type="text" className="form-control" id="url" placeholder="" value= {this.state.url} onChange={this.handleChangeUrl} />
								</div>
								<div className="col-md-4 mb-3">
									<label htmlFor="image-url">Image URL</label>
									<input type="text" className="form-control" id="image-url" placeholder="" value= {this.state.imageUrl} onChange={this.handleChangeImageUrl} />
								</div>																								
							</div>
							<div className="row">
								<div className="col-md-12">
									<label htmlFor="description">Description</label>
									<textarea type="text" className="form-control" value= {this.state.description} onChange={this.handleChangeDescription} rows="3"></textarea>
								</div>
							</div>
							<hr className="mb-4"/>
							<div className="btn btn-primary" onClick={this.handleUpdate}>Update</div>
						</form>
					</div>
				</div>
			</span>
		)
	}
}

export default WebsiteEdit;