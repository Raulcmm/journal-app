import { useState } from "react";

const useForm = (initialState) => {
	const [values, setValues] = useState(initialState);

	const reset = (newState = initialState) => {
		setValues(initialState);
	};

	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.value,
		});
	};
	return [values, handleInputChange, reset];
};

export default useForm;
