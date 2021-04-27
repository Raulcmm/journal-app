import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";

import { activeNote, startDeleting } from "../../redux/actions/notesActions";

const NoteScreen = () => {
	const { active: note } = useSelector((state) => state.notes);
	const dispatch = useDispatch();

	const activeId = useRef(note.id);
	const [formValues, handleInputchange, reset] = useForm(note);
	const { id, title, body } = formValues;

	useEffect(() => {
		if (note.id !== activeId.current) {
			reset(note);
			activeId.current = note.id;
		}
	}, [reset, note.id, activeId]);

	useEffect(() => {
		dispatch(activeNote(id, { ...formValues }));
	}, [formValues]);

	const handleDeleteNote = () => {
		dispatch(startDeleting());
	};

	return (
		<div className="notes__main-content">
			<NotesAppBar />
			{note.url && (
				<div className="notes__image">
					<img src={note.url} alt="someone img" />
				</div>
			)}
			<div className="notes__content">
				<div className="notes__form-group">
					<input
						type="text"
						placeholder="Some awesome title"
						className="notes__title-input"
						autoComplete="false"
						name="title"
						value={title}
						onChange={handleInputchange}
					/>
					<button className="btn btn-danger" onClick={handleDeleteNote}>
						<i class="fas fa-trash"></i>
					</button>
				</div>
				<textarea
					name="body"
					id=""
					placeholder="What happend today?"
					className="notes__textarea"
					value={body}
					onChange={handleInputchange}
				></textarea>
			</div>
		</div>
	);
};

export default NoteScreen;
