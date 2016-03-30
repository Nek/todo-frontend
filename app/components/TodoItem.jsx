import React from 'react';
import {findDOMNode} from 'react-dom';
import {Input, ListGroupItem} from 'react-bootstrap';
import {DragSource, DropTarget} from 'react-dnd';


class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange() {
		this.props.onToggle(this.props.id);
	}
	render() {

		const {id} = this.props;
		const {isDragging, connectDragSource, connectDropTarget} = this.props;

		const text = this.props.description || 'Do something';
		const label = <span style={{textDecoration: this.props.done ? 'line-through' : undefined}}>{text}</span>;

		const dragDropSource = connectDragSource(connectDropTarget(
			<span className="todo-item list-group-item">
				<div className="form-group">
					<div className="checkbox">
						<label>
							<input checked={this.props.done} onChange={this.handleChange} type="checkbox"/>
							{label}
						</label>
					</div>
				</div>
			</span>
		));

		return dragDropSource;
					
	}
}

TodoItem.propTypes = {
	id: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	done: React.PropTypes.bool.isRequired,
	onToggle: React.PropTypes.func.isRequired,
	onMove: React.PropTypes.func.isRequired
};

const Types = {
  CARD: 'card'
};

const cardSource = {
  beginDrag(props) {
	return {
	  id: props.id
	};
  }
};

const cardTarget = {
	hover(props, monitor, component) {
		const dragId = monitor.getItem().id;
		const hoverId = props.id;

		if (dragId === hoverId) {
		  return;
		}

		props.onMove(dragId, hoverId);
	}
};

const collectDrop = connect => ({
	connectDropTarget: connect.dropTarget()
});

const collectDrag = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
})

export default DropTarget(Types.CARD, cardTarget, collectDrop)(DragSource(Types.CARD, cardSource, collectDrag)(TodoItem));