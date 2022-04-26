import { useState } from "react";
import "./App.css";

import TodoService from "./services/TodoService";

import Form from "./components/Form";
import TodosList from "./components/TodosList";

function App() {
	const [creatingTodo, setCreatingTodo] = useState(false);
	const [reloadData, setReload] = useState(false);

	const onSubmit = async (data) => {
		setCreatingTodo(true);
		await TodoService.createTodo({ ...data });
		setCreatingTodo(false);
		setReload((prev) => !prev);
	};

	return (
		<div className="container">
			<Form onSubmit={onSubmit} loading={creatingTodo} />
			<div className="app-divider" />
			<TodosList reload={reloadData} />
		</div>
	);
}

export default App;
