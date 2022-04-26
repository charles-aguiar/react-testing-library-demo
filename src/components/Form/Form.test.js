import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { screen, render, fireEvent } from "@testing-library/react";

import Form from ".";

const onSubmit = jest.fn();
const options = ["ReactJS", "NodeJS", "Typescript"];

describe("Form tests", () => {
	it("should disable submit button if all data is empty", () => {
		/* 1) Arrange */
		render(<Form onSubmit={onSubmit} />);

		/* 2) Act */
		userEvent.click(screen.getByTestId("form-submit-button"));

		/* 3) Assert */
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("should disable submit button if some data is empty", () => {
		/* 1) Arrange */
		render(<Form onSubmit={onSubmit} />);

		/* 2) Act */
		fireEvent.change(screen.getByLabelText("title-input"), {
			target: { value: "todo1" },
		});
		fireEvent.change(screen.getByLabelText("description-input"), {
			target: { value: "test" },
		});

		userEvent.click(screen.getByTestId("form-submit-button"));

		/* 3) Assert */
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("should submit form if all data is filled", () => {
		/* 1) Arrange */
		const title = "todo1";
		const description = "123";
		const selectedOption = options[0];

		render(<Form onSubmit={onSubmit} />);

		/* 2) Act */
		fireEvent.change(screen.getByLabelText("title-input"), {
			target: { value: title },
		});
		fireEvent.change(screen.getByLabelText("description-input"), {
			target: { value: description },
		});

		/* Selection an option from the dropdown */
		userEvent.click(screen.getByLabelText("dropdown-anchor-button"));
		userEvent.click(screen.queryByText(selectedOption));

		userEvent.click(screen.getByTestId("form-submit-button"));

		/* 3) Assert */
		expect(onSubmit).toHaveBeenCalledWith({
			title,
			description,
			category: selectedOption,
		});
	});
});
