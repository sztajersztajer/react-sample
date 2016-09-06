import React from 'react';
import ReactDOM from 'react-dom';
import BookStore from './BookStore';
var Main = React.createClass({

	getInitialState() {
		return ({name: '', surname: '', randomNumber: 0});
	},

	render() {
		return (
			<div>
				<BookStore/>
			</div>
		);
	}

});
ReactDOM.render(
	<Main/>, document.getElementById('root'));
