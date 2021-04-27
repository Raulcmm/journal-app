import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../../firebase/firebase_config";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";

export const startLogOut = () => async (dispatch) => {
	await firebase
		.auth()
		.signOut()
		.then((user) => {
			dispatch({ type: types.logout });

			dispatch({ type: types.notesLoad, payload: [] });
			dispatch({
				type: types.notesActive,
				payload: null,
			});
		});
};

export const startLoginEmailPassword = (email, password) => (dispatch) => {
	dispatch(startLoading());
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(({ user }) => {
			dispatch(login(user.uid, user.displayName));
			dispatch(finishLoading());
		})
		.catch((err) => {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: err.message,
			});
			dispatch(finishLoading());
		});
};

export const startRegisterWithEmailPasswordName = (email, password, name) => (dispatch) => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(async ({ user }) => {
			await user.updateProfile({ displayName: name });
			// dispatch(login(user.uid, user.displayName));
		})
		.catch((err) => {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: err.message,
			});
		});
};

export const startGoogleLogin = () => (dispatch) => {
	firebase
		.auth()
		.signInWithPopup(googleAuthProvider)
		.then((userCredential) => {
			const { uid, displayName } = userCredential.user;
			dispatch(login(uid, displayName));
		})
		.catch((err) => {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: err.message,
			});
		});
};

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
	},
});
