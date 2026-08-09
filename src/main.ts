import "beercss";
import "./styles/custom.css";
import { manifestUrl } from "./lib/manifest-url.ts";
import { displayError } from "./utils/error.ts";
import { parse as parseSchema } from "valibot";
import { ManifestSchema } from "./lib/schemas.ts";
import {
	canvasContainer,
	canvasTemplate, currentImage,
	manifestAttribution,
	manifestDescription,
	manifestLabel, manifestLicense, manifestLogo, manifestMetadataBody,
	manifestMetadataContainer,
	manifestMetadataRowTemplate, manifestMetadataSpace,
	manifestSeeAlsoList, manifestSeeAlsoListItemTemplate,
} from "./lib/elements.ts";
import { stringifyLanguageProperty } from "./utils/language.ts";
import { setHTML } from "./utils/sanitize.ts";

const manifest = await fetch(manifestUrl)
	.then((response) => response.json())
	.then((data) => parseSchema(ManifestSchema, data, {
		abortEarly: true,
		abortPipeEarly: true,
	}))
	.catch(displayError);

setHTML(manifestLabel, stringifyLanguageProperty(manifest.label));
setHTML(manifestDescription, stringifyLanguageProperty(manifest.description));

if (manifest.metadata?.length) {
	for (const data of manifest.metadata) {
		const newMetadataRow = document.importNode(
			manifestMetadataRowTemplate.content,
			true
		);

		const manifestMetadataLabel = newMetadataRow.querySelector(
			".manifestMetadataLabel");
		if (!manifestMetadataLabel) {
			const error = new Error(`Element with class="manifestMetadataLabel" not found inside element with id="manifestMetadataRowTemplate"`);
			error.name = "ElementNotFoundError";
			displayError(error);
		}
		const manifestMetadataValue = newMetadataRow.querySelector<HTMLTableCellElement>(
			".manifestMetadataValue");
		if (!manifestMetadataValue) {
			const error = new Error(`Element with class="manifestMetadataValue" not found inside element with id="manifestMetadataRowTemplate"`);
			error.name = "ElementNotFoundError";
			displayError(error);
		}

		setHTML(manifestMetadataLabel, stringifyLanguageProperty(data.label));
		setHTML(manifestMetadataValue, stringifyLanguageProperty(data.value));

		manifestMetadataBody.appendChild(newMetadataRow);
	}
} else {
	manifestMetadataContainer.remove();
	manifestMetadataSpace.remove();
}

if (typeof manifest.logo === "object") {
	const error = new Error("Unsupported logo object");
	error.name = "UnsupportedPropertyTypeError";
	displayError(error);
}
manifestLogo.src = manifest.logo;
const manifestAttributionStr = stringifyLanguageProperty(manifest.attribution);
manifestLogo.alt = manifestAttributionStr + " " + manifestLogo.alt;
setHTML(manifestAttribution, manifestAttributionStr);
setHTML(manifestLicense, Array.isArray(manifest.license) ? manifest.license.join(", ") : manifest.license);

if (manifest.seeAlso) {
	for (const seeAlso of Array.isArray(manifest.seeAlso) ? manifest.seeAlso : [manifest.seeAlso]) {
		const newSeeAlsoItem = document.importNode(manifestSeeAlsoListItemTemplate.content, true);

		const manifestSeeAlsoLink = newSeeAlsoItem.querySelector<HTMLAnchorElement>(".manifestSeeAlsoLink");
		if (!manifestSeeAlsoLink) {
			const error = new Error(`Element with class="manifestSeeAlsoLink" not found inside element with id="manifestSeeAlsoListItemTemplate"`);
			error.name = "ElementNotFoundError";
			displayError(error);
		}
		const manifestSeeAlsoInfo = newSeeAlsoItem.querySelector<HTMLSpanElement>(".manifestSeeAlsoInfo");
		if (!manifestSeeAlsoInfo) {
			const error = new Error(`Element with class="manifestSeeAlsoInfo" not found inside element with id="manifestSeeAlsoListItemTemplate"`);
			error.name = "ElementNotFoundError";
			displayError(error);
		}

		const seeAlsoLink = typeof seeAlso === "string" ? seeAlso : seeAlso["@id"];
		const seeAlsoInfo = typeof seeAlso === "string" ? undefined : seeAlso.format;

		setHTML(manifestSeeAlsoLink, seeAlsoLink);
		manifestSeeAlsoLink.href = seeAlsoLink;
		if (seeAlsoInfo) {
			setHTML(manifestSeeAlsoInfo, `(${seeAlsoInfo})`);
		}

		manifestSeeAlsoList.appendChild(newSeeAlsoItem);
	}
}

function setCurrentImage(nativeImageURL: string) {
	currentImage.src = nativeImageURL;
}

// TODO: For now, only the first sequence is shown.
const sequence = manifest.sequences.shift();
if (!sequence) {
	const error = new Error("No sequence found in manifest");
	error.name = "NoSequenceError";
	displayError(error);
}
for (const canvas of sequence.canvases) {
	const newCanvas = document.importNode(canvasTemplate.content, true);

	const canvasCard = newCanvas.querySelector(".canvasCard");
	if (!canvasCard) {
		const error = new Error(`Element with class="canvasCard" not found inside element with id="canvasTemplate"`);
		error.name = "ElementNotFoundError";
		displayError(error);
	}
	const canvasImage = newCanvas.querySelector<HTMLImageElement>(".canvasImage");
	if (!canvasImage) {
		const error = new Error(`Element with class="canvasImage" not found inside element with id="canvasTemplate"`);
		error.name = "ElementNotFoundError";
		displayError(error);
	}
	const canvasLabel = newCanvas.querySelector<HTMLHeadingElement>(".canvasLabel");
	if (!canvasLabel) {
		const error = new Error(`Element with class="canvasLabel" not found inside element with id="canvasTemplate"`);
		error.name = "ElementNotFoundError";
		displayError(error);
	}

	// TODO: For now, only the first image is shown.
	const image = canvas.images.pop();
	if (!image) {
		const error = new Error(`No image found in canvas with ID '${canvas["@id"]}'`);
		error.name = "NoImageError";
		displayError(error);
	}

	let imageURL = typeof image.resource.service === "string"
		? image.resource.service
		: image.resource.service["@id"];
	if (!imageURL.endsWith("/")) imageURL += "/";
	imageURL += "full/192,/0/default.jpg";
	canvasImage.src = imageURL;

	setHTML(canvasLabel, stringifyLanguageProperty(canvas.label));

	let scrollIntoView = false;
	if (canvas["@id"] === sequence.startCanvas) {
		setCurrentImage(image.resource["@id"]);
		scrollIntoView = true;
	}
	canvasCard.addEventListener("click", () => {
		setCurrentImage(image.resource["@id"]);
	});

	canvasContainer.appendChild(newCanvas);

	if (scrollIntoView) {
		canvasCard.scrollIntoView();
	}
}
