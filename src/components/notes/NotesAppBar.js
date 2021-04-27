import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, uploadImage } from "../../redux/actions/notesActions";

const NotesAppBar = () => {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);

	const handleSaveNote = () => {
		dispatch(startSaveNote(note));
	};
	const handlePictureUpload = () => {
		document.getElementById("fileName").click();
	};

	const handlePictureChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			dispatch(uploadImage(file));
		}
	};
	return (
		<div className="notes__appbar">
			<span>{JSON.stringify(new Date().toDateString())}</span>

			<input type="file" name="file" id="fileName" style={{ display: "none" }} onChange={handlePictureChange} />
			<div className="notes__appbar-buttons">
				<button className="btn" onClick={handlePictureUpload}>
					Picture
				</button>
				<button className="btn" onClick={handleSaveNote}>
					Save
				</button>
			</div>
		</div>
	);
};

export default NotesAppBar;
