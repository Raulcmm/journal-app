import { Route, Redirect } from "react-router-dom";

import React from "react";

const PublicRoute = ({ isAuthtenticated, component: Component, ...rest }) => {
	return (
		<Route {...rest} component={(props) => (isAuthtenticated ? <Redirect to="/" /> : <Component {...props} />)} />
	);
};

export default PublicRoute;
