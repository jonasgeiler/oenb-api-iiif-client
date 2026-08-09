import { manifestUrlInput } from "./elements.ts";

const MANIFEST_URL_PARAM = "manifestUrl";
const searchParams = new URLSearchParams(location.search);
const searchParamsManifestUrl = searchParams.get(MANIFEST_URL_PARAM);

export let manifestUrl = searchParamsManifestUrl ||
	// TODO: Default to example from https://iiif.onb.ac.at/gui/manifest.html.
	"/temp-static-manifest.json"; //"https://iiif.onb.ac.at/presentation/ABO/+Z196807705/manifest/";

// Update manifest URL input field.
manifestUrlInput.value = manifestUrl;
