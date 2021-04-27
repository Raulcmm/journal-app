import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { startLogOut } from "../../redux/actions/authActions";
import { startNewNote } from "../../redux/actions/notesActions";
import Journalentries from "./Journalentries";

const SideBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { name } = useSelector((state) => state.auth);

	const handleLogOut = () => {
		dispatch(startLogOut());
		history.replace("/auth/login");
	};

	const handleAddNew = () => {
		dispatch(startNewNote());
	};

	return (
		<aside className="journal__sidebar">
			<div className="journal__sidebar-navbar">
				<h3>
					<span>{name}</span>
				</h3>
				<button className="btn" onClick={handleLogOut}>
					<i className="fas fa-sign-out-alt"></i>
					Sign out
				</button>
			</div>
			<div className="journal__new-entry" onClick={handleAddNew}>
				<i className="far fa-calendar-plus fa-5x"></i>
				<p className="mt-5">New entry</p>
			</div>

			<Journalentries />
		</aside>
	);
};

export default SideBar;
