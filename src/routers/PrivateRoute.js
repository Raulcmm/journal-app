import { Route, Redirect } from "react-router-dom";

import React from "react";

const PrivateRoute = ({ isAuthtenticated, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) => (isAuthtenticated ? <Component {...props} /> : <Redirect to="/auth/login" />)}
		/>
	);
};

export default PrivateRoute;
