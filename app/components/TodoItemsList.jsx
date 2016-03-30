import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class TodoItemsList extends React.Component {
	render() {
		return <ListGroup>
			{this.props.items}
		</ListGroup>
	}
}

export default DragDropContext(HTML5Backend)(TodoItemsList);