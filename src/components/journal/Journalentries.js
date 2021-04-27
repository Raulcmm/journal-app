import React from "react";
import { useSelector } from "react-redux";
import Journalentry from "./Journalentry";

const Journalentries = () => {
	const { notes } = useSelector((state) => state.notes);
	const entries = [...notes];
	return (
		<div className="journal__entries ">
			{entries.map((entry) => (
				<Journalentry key={entry.id} {...entry} />
			))}
		</div>
	);
};

export default Journalentries;
