import React from 'react';
import {Panel, Input, ListGroup, ListGroupItem, Button, Row, Col} from 'react-bootstrap';
import Todo from './components/Todo.jsx';
import InputWidget from './components/InputWidget.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{
					done: false,
					description: "Wash dishes",
					id: "id1"
				},
				{
					done: true,
					description: "Clean car",
					id: "id2"
				},
				{
					done: false,
					description: "Pay rent",
					id: "id3"
				}]
		}
		this.addTodo = this.addTodo.bind(this);
	}
	addTodo(text) {
		let todos = this.state.todos;
		todos.push({
			done: false,
			description: text,
			id: this.generateUUID()
		});
		this.setState({todos});
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

		const footer = (
			<Row>
				<Col md={9}><span>2 items left</span></Col>
				<Col md={3}><a>Mark all as complete</a></Col>
			</Row>
		);
		const todos = this.state.todos.map(({id, description, done}) => <Todo id={id} description={description} done={done}/>);
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