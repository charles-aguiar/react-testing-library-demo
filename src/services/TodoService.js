const getAllTodos = async () => {
	const response = await fetch("http://localhost:3002/todos");
	const data = await response.json();

	return data;
};

const createTodo = async (todo) =>
	fetch("http://localhost:3002/todos", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todo),
	});

const TodoService = {
	getAllTodos,
	createTodo,
};

export default TodoService;
