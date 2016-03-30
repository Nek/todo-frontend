import React from 'react';
import {Input, ListGroupItem} from 'react-bootstrap';


export default class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {done: this.props.done};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.onToggle(this.state.id);
	}
	render() {
		const text = this.props.description || 'Do something';
		const label = <span style={{textDecoration: this.state.done ? 'line-through' : undefined}}>{text}</span>;
		return <ListGroupItem className='todo-item'>
					<Input onClick={this.props.handleClick} type="checkbox" label={label} checked={this.state.done} />
				</ListGroupItem>
	}
}

Todo.propTypes = {
	id: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	done: React.PropTypes.bool.isRequired,
	onToggle: React.PropTypes.func.isRequired
}