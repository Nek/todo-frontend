import React from 'react';
import {Map, List, Record} from 'immutable';
import Todo from './types/Todo';

import {Panel, Button, Row, Col} from 'react-bootstrap';
import TodoItem from './components/TodoItem.jsx';
import InputWidget from './components/InputWidget.jsx';
import TodoItemsList from './components/TodoItemsList.jsx';

const apiRoot = '/api/v1';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todosById: Map(),
			todos: List()
		};

		this.addTodo = this.addTodo.bind(this);
		this.toggleTodo = this.toggleTodo.bind(this);
		this.completeAllTodos = this.completeAllTodos.bind(this);
		this.moveTodo = this.moveTodo.bind(this);
	}
	componentDidMount() {
		fetch(apiRoot + '/todos', {
			method: 'get'
		}).then(function(response) {
			return response.json();
		})
		.then(function(data) {
			const todosById = Map(data.reduce((map, item) => {
				return map.set(item.id, new Todo({
					done: item.done,
					description: item.description,
					id: item.id
				}));
			}, Map()));
			const todos = List(data.map((item => {
				return item.id;
			})));

			this.setState({todosById, todos});
		}.bind(this))
		.catch(function(err) {
			// Error :(
		});
	}
	addTodo(text) {
		fetch(apiRoot + '/todos', {
			method: 'post',
			body: JSON.stringify(new Todo({
				description: text
			}))
		}).then(function(response) {
			console.log(response.json());
		})
		.catch(function(err) {

		});
		// const id = this.generateUUID();
		// const oldTodosById = this.state.todosById;
		// const oldTodos = this.state.todos;

		// const todosById = oldTodosById.set(id, new Todo({
		// 	done: false,
		// 	description: text,
		// 	id
		// }));
		// const todos = oldTodos.push(id);
		// this.setState({todosById, todos});
	}
	toggleTodo(id) {
		const oldTodosById = this.state.todosById;
		const oldTodo = oldTodosById.get(id);

		const todosById = oldTodosById.set(id, new Todo({
			done: !oldTodo.get('done'),
			description: oldTodo.get('description'),
			id: id
		}));
		this.setState({todosById});
	}
	completeAllTodos() {
		const oldTodosById = this.state.todosById;
		const todosById = oldTodosById.map(
			(todo) => {
				const done = todo.get('done');
				if (done) return todo;
				return new Todo({
					done: true,
					description: todo.get('description'),
					id: todo.get('id')
				});}
			);
		this.setState({todosById});
	}
	moveTodo(id, toId) {
		const oldTodos = this.state.todos;

		const from = oldTodos.indexOf(id);
		const to = oldTodos.indexOf(toId);

		const tempTodos = oldTodos.splice(from, 1);
		const todos = tempTodos.insert(to, id);

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

		const itemsLeft = this.state.todosById.filter((todo) => !todo.get('done')).count();

		const footer = (
			<Row>
				<Col md={9}><span>{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span></Col>
				<Col md={3}><a className='link-button' onClick={this.completeAllTodos}>Mark all as complete</a></Col>
			</Row>
		);
		const todos = this.state.todos.map((id) => 
			{
				const {description, done} = this.state.todosById.get(id);
				return <TodoItem onMove={this.moveTodo} id={id} description={description} done={done} onToggle={this.toggleTodo}/>
			});
		return <Row>
			<Col md={2}/>
			<Col md={8}>
				<Panel header={title} footer={footer}>
					<InputWidget onSubmit={this.addTodo}/>
					<TodoItemsList items={todos}/>
				</Panel>
			</Col>
			<Col md={2}/>
		</Row>
  }
}