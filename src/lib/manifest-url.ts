import { manifestUrlInput } from "./elements.ts";
import { displayError } from "../utils/error.ts";

// Default to example from https://iiif.onb.ac.at/gui/manifest.html.
export let manifestUrl = "https://iiif.onb.ac.at/presentation/ABO/+Z196807705/manifest/";

const MANIFEST_URL_PARAM = "manifestUrl";
const searchParams = new URLSearchParams(location.search);
const searchParamsManifestUrl = searchParams.get(MANIFEST_URL_PARAM);
if (searchParamsManifestUrl) {
	try {
		// Parse as URL to validate.
		const searchParamsManifestUrlObj = new URL(searchParamsManifestUrl);

		// Prevent mixed content errors.
		if (searchParamsManifestUrlObj.protocol !== location.protocol) {
			searchParamsManifestUrlObj.protocol = location.protocol;
		}

		// Overwrite default.
		manifestUrl = searchParamsManifestUrlObj.toString();
	} catch (error: unknown) {
		if (error instanceof Error) {
			displayError(error);
		} else {
			throw error;
		}
	}
}

// Update manifest URL input field.
manifestUrlInput.value = manifestUrl;
