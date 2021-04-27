import Swal from "sweetalert2";
import { db } from "../../firebase/firebase_config";
import { loadNotes } from "../../helpers/loadNotes";
import { uploadFile } from "../../helpers/uploadFile";
import { types } from "../types/types";

export const startNewNote = () => async (dispatch, getState) => {
	const { uid } = getState().auth;
	const newNote = {
		title: "",
		body: "",
		date: new Date().getTime(),
	};
	// const doc =
	db.collection(`${uid}/journal/notes`)
		.add(newNote)
		.then((res) => {
			dispatch(activeNote(res.id, newNote));
			dispatch(addNewNote(res.id, newNote));
		});
};

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes,
});

export const startLoadingNotes = (uid) => {
	return async (dispatch) => {
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};
export const setActiveNote = (uid, note) => (dispatch) => {
	dispatch(activeNote(uid, note));
};

export const startSaveNote = (note) => async (dispatch, getState) => {
	const { uid } = getState().auth;

	if (!note.url) {
		delete note.url;
	}
	const noteToFireStore = { ...note };
	delete noteToFireStore.id;
	await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);
	dispatch(refreshNote(note.id, noteToFireStore));
	Swal.fire("Saved", note.title, "success");
};

export const addNewNote = (id, note) => ({
	type: types.notesAddNewNote,
	payload: {
		id,
		...note,
	},
});

// actions creators
export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note,
	},
});

export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: {
		id,
		note: {
			id,
			...note,
		},
	},
});

export const uploadImage = (file) => async (dispatch, getState) => {
	const { active } = getState().notes;

	Swal.fire({
		title: "Uploading...",
		text: "Please wait...",
		showConfirmButton: false,
		onBeforeOpen: () => {
			Swal.showLoading();
		},
	});
	const imageUrl = await uploadFile(file);
	active.url = imageUrl.url;
	dispatch(startSaveNote(active));
	Swal.close();
};

export const startDeleting = () => async (dispatch, getState) => {
	const uid = getState().auth.uid;
	const { active } = getState().notes;

	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes, delete it!",
		cancelButtonText: "No, cancel!",
		reverseButtons: true,
	}).then(async (result) => {
		if (result.isConfirmed) {
			await db.doc(`${uid}/journal/notes/${active.id}`).delete();
			dispatch({
				type: types.notesDelete,
				payload: active.id,
			});
			Swal.fire("Deleted!", "Your file has been deleted.", "success");
		} else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
		}
	});
};
