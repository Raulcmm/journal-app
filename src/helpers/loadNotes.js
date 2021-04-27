import { db } from "../firebase/firebase_config";

export const loadNotes = async (uid) => {
	const notesSnap = await db.collection(`${uid}/journal/notes`).orderBy("date").get();
	const notes = [];

	notesSnap.forEach((snap) => {
		notes.push({ id: snap.id, ...snap.data() });
	});

	return notes;
};
