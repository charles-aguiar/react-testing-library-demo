import { useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import useCollapse from "react-collapsed";

import TodoService from "../../services/TodoService";

import PacmanLoader from "react-spinners/PacmanLoader";

import { FaPlus, FaMinus } from "react-icons/fa";

import "./TodosList.css";

function TodosList({ reload = false }) {
	const fetchFn = useCallback(() => TodoService.getAllTodos(), [reload]);
	const { data, loading } = useFetch(fetchFn);

	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

	return (
		<div className="todoslist-container">
			<div className="todoslist-title">Todos Tracker</div>
			{loading || !data ? (
				<PacmanLoader loading={true} size={40} color="rgb(62, 183, 231, 0.5)" />
			) : (
				<>
					<span className="todoslist-subtitle">{`You have ${data.length} todos this week!`}</span>
					<div className="todoslist-display-container">
						{data.map((todo) => (
							<div key={todo.id}>
								<div className="todolist-expandable" {...getToggleProps()}>
									<div className="todoslist-todo-title">
										<div className="todoslist-todo-category">
											{todo.category}
										</div>
										{todo.title}
									</div>
									{isExpanded ? (
										<FaMinus color="gray" />
									) : (
										<FaPlus color="gray" />
									)}
								</div>
								<div
									className="todoslist-collpsed-container"
									{...getCollapseProps()}
								>
									<span>{todo.description}</span>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default TodosList;
