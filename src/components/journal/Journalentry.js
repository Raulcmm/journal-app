import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../redux/actions/notesActions";

import defaultBackground from "../../assets/back_4.jpg";
const Journalentry = ({ title, body, date, url, id }) => {
	const noteDate = moment(date);
	const dispatch = useDispatch();

	const handleEntryClick = () => {
		dispatch(
			setActiveNote(id, {
				title,
				body,
				date,
				url,
			})
		);
	};
	return (
		<div className="journal__entry pointer" onClick={handleEntryClick}>
			<div
				className="journal__entry-picture"
				style={{
					backgroundSize: "Cover",
					backgroundImage: `URL(${url || defaultBackground})`,
				}}
			></div>
			<div className="journal__entry-body">
				<p className="journal__entry-title">{title ? title.slice(0, 15) : "Title"}</p>
				<p className="journal__entry-content">{body ? body.slice(0, 80) + "..." : ""}</p>
			</div>
			<div className="journal__entry-date-box">
				<span>{noteDate.format("dddd")}</span>
				<h4>{noteDate.format("Do")}</h4>
			</div>
		</div>
	);
};

export default Journalentry;
