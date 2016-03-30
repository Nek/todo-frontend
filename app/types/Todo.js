import {Record} from 'immutable';

const Todo = Record({
	done: false,
	description: '',
	id: undefined
});

export default Todo;