import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

import validator from "validator";
import { useDispatch } from "react-redux";
import { removeError, setError } from "../../redux/actions/ui";
import { useSelector } from "react-redux";
import { startRegisterWithEmailPasswordName } from "../../redux/actions/authActions";

const RegisterScreen = () => {
	const initialForm = {
		name: "",
		email: "",
		password: "",
		password2: "",
	};

	const dispatch = useDispatch();
	const { msgError } = useSelector((state) => state.ui);
	const [formValues, handleInputChange, reset] = useForm(initialForm);
	const { name, email, password, password2 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
			reset();
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError("Name is not valid"));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError("Email is not valid"));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError("Password shoul be at leats 6 characters and match each other"));
			return false;
		} else {
			dispatch(removeError(""));
			return true;
		}
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>
			<form onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete="off"
					value={name}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					value={email}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					value={password}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					placeholder="confirm password"
					name="password2"
					className="auth__input"
					value={password2}
					onChange={handleInputChange}
				/>
				<button type="submit" className="btn btn-primary btn-block mb-5">
					Register
				</button>

				<Link to="/auth/login" className="link ">
					Already register?
				</Link>
			</form>
		</>
	);
};

export default RegisterScreen;
