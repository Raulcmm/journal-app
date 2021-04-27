export const uploadFile = async (file) => {
	const cloudUrl = `https://api.cloudinary.com/v1_1/dcbu2isb0/upload`;
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "react-journal");

	try {
		const resp = await fetch(cloudUrl, {
			method: "POST",
			body: formData,
		});
		if (resp.ok) {
			const result = await resp.json();
			return result;
		}
	} catch (error) {
		throw error(error);
	}
};
