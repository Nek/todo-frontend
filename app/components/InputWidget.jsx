import React from 'react';
import {Input, Button, Row, Col} from 'react-bootstrap';


export default class InputWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state=  {
			inputText: ''
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInput(e) {
		this.setState({inputText:e.currentTarget.value});
	}
	handleSubmit() {
		this.props.onSubmit(this.state.inputText);
		this.setState({inputText:''});
	}
	render() {
		return <Row>
				<Col md={9}><Input onChange={this.handleInput} type="text" placeholder="What needs to be done." value={this.state.inputText}></Input></Col>
				<Col md={3}><Button onClick={this.handleSubmit}>Add Todo</Button></Col>
			</Row>
	}
}

InputWidget.propTypes = {
	onSubmit: React.PropTypes.func.isRequired
}