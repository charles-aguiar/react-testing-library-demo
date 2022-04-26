import { useEffect, useReducer } from "react";

const ACTION_TYPES = {
	START: "START",
	SUCCESS: "SUCCESS",
	ERROR: "ERROR",
};

export const INITIAL_STATE = {
	data: null,
	loading: false,
	success: false,
	error: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.START:
			return { ...state, loading: true };
		case ACTION_TYPES.SUCCESS:
			return {
				...state,
				error: null,
				success: true,
				loading: false,
				data: action.data,
			};
		case ACTION_TYPES.ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
				success: false,
				data: null,
			};
		default:
			return { ...state };
	}
};

const useFetch = (fetchFn = () => {}) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	useEffect(() => {
		const f = async () => {
			dispatch({ type: ACTION_TYPES.START });

			try {
				const data = await fetchFn();
				dispatch({ type: ACTION_TYPES.SUCCESS, data });
			} catch (error) {
				dispatch({ type: ACTION_TYPES.ERROR, error });
			}
		};

		f();
	}, [fetchFn]);

	return { ...state };
};

export default useFetch;
