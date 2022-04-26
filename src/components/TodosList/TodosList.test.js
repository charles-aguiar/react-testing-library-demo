import "@testing-library/jest-dom";

import { screen, render, waitFor } from "@testing-library/react";

import TodoService from "../../services/TodoService";
import TodosList from ".";

import { mockedTodos } from "../../utils/mocks";

jest.mock("../../services/TodoService");

describe("TodosList tests", () => {
	it("should render the returned data", async () => {
		/* 1) Arrange */
		TodoService.getAllTodos.mockResolvedValue(mockedTodos);

		/* 2) Act */
		render(<TodosList />);

		/* 3) Assert */
		await waitFor(() => {
			mockedTodos.forEach((todo) => {
				expect(screen.getByText(todo.title)).toBeInTheDocument();
				expect(screen.getByText(todo.description)).toBeInTheDocument();
				expect(screen.getByText(todo.category)).toBeInTheDocument();
			});
		});
	});
});
