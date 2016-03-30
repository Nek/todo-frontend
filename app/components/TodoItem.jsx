import React from 'react';
import {Input, ListGroupItem} from 'react-bootstrap';


export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange() {
		this.props.onToggle(this.props.id);
	}
	render() {
		const text = this.props.description || 'Do something';
		const label = <span style={{textDecoration: this.props.done ? 'line-through' : undefined}}>{text}</span>;
		return <ListGroupItem className='todo-item'>
					<Input onChange={this.handleChange} type="checkbox" label={label} checked={this.props.done} />
				</ListGroupItem>
	}
}

TodoItem.propTypes = {
	id: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	done: React.PropTypes.bool.isRequired,
	onToggle: React.PropTypes.func.isRequired
}