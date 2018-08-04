import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WebsiteItem from './WebsiteItem.jsx';

class Websites extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			websites: []
		}
	}

	render(){
		return (
			<div>
				{
					this.state.websites.map( website => <WebsiteItem website={website} key={website.name}></WebsiteItem>)
				}	
			</div>		
		)
	}
}

export default Websites;