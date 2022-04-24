import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { screen, render, within } from "@testing-library/react";

import Dropdown from ".";

const options = ["ReactJS", "NodeJS", "Typescript"];
const label = "Test dropdown";
const placeholder = "Placeholder";
const dummyFn = () => {};

describe("Dropdown tests", () => {
	it("should be initially closed", () => {
		/* 1) Arrange */
		render(
			<Dropdown
				label={label}
				placeholder={placeholder}
				options={options}
				onSelection={dummyFn}
			/>
		);

		/* 2) Act */
		/* -- */

		/* 3) Assert */
		options.forEach((opt) => {
			expect(screen.queryByText(opt)).not.toBeInTheDocument();
		});

		/* none is selected, should display placeholder */
		const { getByText } = within(screen.getByRole("button"));
		expect(getByText(placeholder)).toBeInTheDocument();
	});

	it("should open when clicked", () => {
		/* 1) Arrange */
		render(
			<Dropdown
				label={label}
				placeholder={placeholder}
				options={options}
				onSelection={dummyFn}
			/>
		);

		/* 2) Act */
		userEvent.click(screen.getByRole("button"));

		/* 3) Assert */
		options.forEach((opt) => {
			expect(screen.getByText(opt)).toBeInTheDocument();
		});
	});

	it("should call selection function and dismiss when option is selected", () => {
		/* 1) Arrange */
		const onSelection = jest.fn();
		const selectedOption = options[0];
		render(
			<Dropdown
				label={label}
				placeholder={placeholder}
				options={options}
				onSelection={onSelection}
			/>
		);

		/* 2) Act */
		userEvent.click(screen.getByRole("button"));
		/* Clicking in the first option */
		userEvent.click(screen.getByText(selectedOption));

		/* 3) Assert */
		/* Call onSelection function */
		expect(onSelection).toHaveBeenCalledWith(selectedOption);

		/* Dismiss */
		options.forEach((opt) => {
			expect(screen.queryByText(opt)).not.toBeInTheDocument();
		});
	});

	it("should display selected option if provided", () => {
		/* 1) Arrange */
		const selectedOption = options[0];
		render(
			<Dropdown
				label={label}
				placeholder={placeholder}
				options={options}
				onSelection={dummyFn}
				selected={selectedOption}
			/>
		);

		/* 2) Act */
		/* -- */

		/* 3) Assert */
		/* Display selected option */
		const { getByText } = within(screen.getByRole("button"));
		expect(getByText(selectedOption)).toBeInTheDocument();
	});
});
