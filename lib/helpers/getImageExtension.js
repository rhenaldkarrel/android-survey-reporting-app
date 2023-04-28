export function getUrlExtension(file) {
	return file.split(/[#?]/)[0].split('.').pop().trim();
}
