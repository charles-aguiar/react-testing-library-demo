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
		fireEvent.change(screen.getByLabelText("name-input"), {
			target: { value: "username" },
		});
		fireEvent.change(screen.getByLabelText("password-input"), {
			target: { value: "123" },
		});

		userEvent.click(screen.getByTestId("form-submit-button"));

		/* 3) Assert */
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("should submit form if all data is filled", () => {
		/* 1) Arrange */
		const username = "username";
		const password = "123";
		const selectedOption = options[0];

		render(<Form onSubmit={onSubmit} />);

		/* 2) Act */
		fireEvent.change(screen.getByLabelText("name-input"), {
			target: { value: username },
		});
		fireEvent.change(screen.getByLabelText("password-input"), {
			target: { value: password },
		});

		/* Selection an option from the dropdown */
		userEvent.click(screen.getByLabelText("dropdown-anchor-button"));
		userEvent.click(screen.queryByText(selectedOption));

		userEvent.click(screen.getByTestId("form-submit-button"));

		/* 3) Assert */
		expect(onSubmit).toHaveBeenCalledWith({
			username,
			password,
			selectedTechonology: selectedOption,
		});
	});
});
