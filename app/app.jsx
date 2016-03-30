import React from 'react';
import {Map, List, Record} from 'immutable';
import {Panel, Input, ListGroup, ListGroupItem, Button, Row, Col} from 'react-bootstrap';
import TodoItem from './components/TodoItem.jsx';
import InputWidget from './components/InputWidget.jsx';
import Todo from './types/Todo';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todosById: Map({
					"id1" : new Todo({
						description: "Wash dishes",
						id: "id1"
					}),
					"id2" : new Todo({
						done: true,
						description: "Clean car",
						id: "id2"
					}),
					"id3" : new Todo({
						description: "Pay rent",
						id: "id3"
					})}),
			todos: List(["id1", "id2", "id3"])};

		this.addTodo = this.addTodo.bind(this);
		this.toggleTodo = this.toggleTodo.bind(this);
	}
	addTodo(text) {
		const id = this.generateUUID();
		const oldTodosById = this.state.todosById;
		const oldTodos = this.state.todos;

		const todosById = oldTodosById.set(id, new Todo({
			done: false,
			description: text,
			id
		}));
		const todos = oldTodos.push(id);
		this.setState({todosById, todos});
	}
	toggleTodo(id) {
		const oldTodos = this.state.todos;
		const oldTodosById = this.state.todosById;
		const oldTodo = oldTodosById.get(id);

		const todosById = oldTodosById.set(id, new Todo({
			done: !oldTodo.get('done'),
			description: oldTodo.get('description'),
			id: id
		}));
		this.setState({todosById});
	}
	generateUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}
	render() {
		const title = (
			<h1>Todos</h1>
		);

		const itemsLeft = this.state.todosById.filter((todo) => !todo.get('done')).length;

		const footer = (
			<Row>
				<Col md={9}><span>{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span></Col>
				<Col md={3}><a>Mark all as complete</a></Col>
			</Row>
		);
		const todos = this.state.todos.map((id) => 
			{
				const {description, done} = this.state.todosById.get(id);
				return <TodoItem id={id} description={description} done={done} onToggle={this.toggleTodo}/>
			});
		return <Row>
			<Col md={2}/>
			<Col md={8}>
				<Panel header={title} footer={footer}>
					<InputWidget onSubmit={this.addTodo}/>
					<ListGroup fill>
						{todos}
					</ListGroup>
				</Panel>
			</Col>
			<Col md={2}/>
		</Row>
  }
}