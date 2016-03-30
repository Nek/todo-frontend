import React from 'react';
import {Panel, Input, ListGroup, ListGroupItem, Button, Row, Col} from 'react-bootstrap';
 
let todos = {
	"id1" : {
		done: false,
		description: "Wash dishes",
		id: "id1"
	},
	"id2" : {
		done: true,
		description: "Clean car",
		id: "id2"
	},
	"id3" : {
		done: false,
		description: "Pay rent",
		id: "id3"
	}
};

let order = ["id1", "id2", "id3"];

const title = (
  <h1>Todos</h1>
);

const footer = (
	<Row>
      	<Col md={9}><span>2 items left</span></Col>
    	<Col md={3}><a>Mark all as complete</a></Col>
    </Row>
);

export default class App extends React.Component {
  render() {
    return <Row>
		<Col md={2}/>
		<Col md={8}>
		    <Panel header={title} footer={footer}>
		      	<Row>
		      		<Col md={9}><Input type="text" placeholder="What needs to be done."></Input></Col>
		      		<Col md={3}><Button>Add Todo</Button></Col>
		      	</Row>
		      
		        <ListGroup fill>
			    <ListGroupItem>
			    	<Input type="checkbox" label="Checkbox" checked readOnly />
			    </ListGroupItem>
			    <ListGroupItem>
			    	<Input type="checkbox" label="Checkbox" checked readOnly />
			    </ListGroupItem>
			    <ListGroupItem>
			    	<Input type="checkbox" label="Checkbox" checked readOnly />
			    </ListGroupItem>
			    <ListGroupItem>
			    	<Input type="checkbox" label="Checkbox" checked readOnly />
			    </ListGroupItem>
			    <ListGroupItem>
			    	<Input type="checkbox" label="Checkbox" checked readOnly />
			    </ListGroupItem>
			  </ListGroup>
		    </Panel>
	    </Col>
	    <Col md={2}/>
  	</Row>
  }
}