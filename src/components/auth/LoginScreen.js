import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { startGoogleLogin, startLoginEmailPassword } from "../../redux/actions/authActions";

const LoginScreen = () => {
	const initialState = {
		email: "osva@gmail.com",
		password: "123456",
	};

	const { loading } = useSelector((state) => state.ui);
	const dispatch = useDispatch();
	const [formValues, handleInputChange] = useForm(initialState);
	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLoginEmailPassword(email, password));
	};

	const handleGoogleLogin = () => {
		dispatch(startGoogleLogin());
	};

	return (
		<>
			<h3 className="auth__title">Login</h3>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="email"
					name="email"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputChange}
					value={email}
				/>
				<input
					type="password"
					placeholder="*********"
					name="password"
					className="auth__input"
					onChange={handleInputChange}
					value={password}
				/>
				<button type="submit" className="btn btn-primary btn-block" disabled={loading}>
					{loading ? "..." : "Login"}
				</button>
				<div className="auth__social-networks">
					<br />
					<div className="google-btn" onClick={handleGoogleLogin}>
						<div className="google-icon-wrapper">
							<img
								className="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="google button"
							/>
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>
					</div>
				</div>
				<Link to="/auth/register" className="link">
					Create new account
				</Link>
			</form>
		</>
	);
};

export default LoginScreen;
