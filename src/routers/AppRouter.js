import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import React from "react";
import AuthRouter from "./AuthRouter";
import JournalScreen from "../components/journal/JournalScreen";
import { useEffect } from "react";
import { firebase } from "../firebase/firebase_config";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useState } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { startLoadingNotes } from "../redux/actions/notesActions";
import LoadingCharge from "../components/auth/LoadingCharge";

const AppRouter = () => {
	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);
				dispatch(startLoadingNotes(user.uid));
			} else {
				setIsLoggedIn(false);
			}
			setChecking(false);
		});
	}, [dispatch, firebase.auth().onAuthStateChanged]);

	if (checking) {
		return <LoadingCharge />;
	}

	return (
		<Router>
			<div>
				<Switch>
					<PrivateRoute isAuthtenticated={isLoggedIn} component={JournalScreen} exact path="/" />
					<PublicRoute path="/auth" component={AuthRouter} isAuthtenticated={isLoggedIn} />
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
