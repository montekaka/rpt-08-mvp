import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Website extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			website: '',
			_id: ''
		}
	}

	componentDidMount() {
		var _id = this.props.match.params._id;
		
		this.setState({_id: _id});
	}

	render() {
		return (
			<div>Hello World {this.state._id}</div>
		)
	}
}

export default Website;