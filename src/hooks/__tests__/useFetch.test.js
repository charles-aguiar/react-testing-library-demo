/* eslint-disable no-console */
import { renderHook } from "@testing-library/react-hooks";
import useFetch, { INITIAL_STATE } from "../useFetch";

const originalConsoleError = console.error;
console.error = (...args) => {
	if (
		/Warning.*not wrapped in act/.test(args[0]) ||
		/Warning.*is no longer supported in React 18/.test(args[0])
	) {
		return;
	}
	originalConsoleError(...args);
};

const errorMessage = "Deu ruim...";
const data = { hello: "world" };

describe("useFetch", () => {
	it("should return a loding state (not awaited)", () => {
		/* 1) Arrange */
		const fetchServiceMock = jest.fn().mockReturnValue(data);

		/* 2) Act */
		const { result } = renderHook(() => useFetch(fetchServiceMock));
		const state = result.current;

		/* 3) Assert */
		expect(state).toEqual({ ...INITIAL_STATE, loading: true });
	});

	it("should update when service function is finished and return data", async () => {
		/* 1) Arrange */
		const fetchServiceMock = jest.fn().mockReturnValue(data);

		/* 2) Act */
		const { result } = await renderHook(() => useFetch(fetchServiceMock));
		const state = result.current;

		/* 3) Assert */
		expect(state).toEqual({
			...INITIAL_STATE,
			success: true,
			data: data,
		});
	});

	it("should return state with error if service throws an error", async () => {
		/* 1) Arrange */
		const fetchServiceError = jest.fn(() => {
			throw new Error(errorMessage);
		});

		/* 2) Act */
		const { result } = await renderHook(() => useFetch(fetchServiceError));
		const state = result.current;

		/* 3) Assert */
		expect(state).toEqual({ ...INITIAL_STATE, error: new Error(errorMessage) });
	});
});
