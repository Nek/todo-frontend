import React from 'react';
import {Input, ListGroupItem} from 'react-bootstrap';


export default class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {done: this.props.done};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		console.log(this.props.id);
	}
	render() {
		return <ListGroupItem className='todo-item'>
					<Input onClick={this.handleClick} type="checkbox" label={this.props.description || 'Do something'} checked={this.state.done} />
				</ListGroupItem>
	}
}

Todo.propTypes = {
	id: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	done: React.PropTypes.bool.isRequired,
}