function getElement<H extends HTMLElement>(elementId: string): H {
	const element = document.getElementById(elementId);
	if (!element) {
		const error = new Error(`Element with id="${elementId}" not found`);
		error.name = "ElementNotFoundError";
		alert(error);
		throw error;
	}

	return element as H;
}

export const manifestUrlInput = getElement<HTMLInputElement>("manifestUrlInput");

export const canvasContainer = getElement<HTMLDivElement>("canvasContainer");
export const canvasTemplate = getElement<HTMLTemplateElement>("canvasTemplate");

export const currentImageContainer = getElement<HTMLDivElement>("currentImageContainer");
export const currentImage = getElement<HTMLImageElement>("currentImage");

export const manifestLabel = getElement<HTMLHeadingElement>("manifestLabel");
export const manifestDescription = getElement<HTMLParagraphElement>("manifestDescription");
export const manifestMetadataContainer = getElement<HTMLDetailsElement>("manifestMetadataContainer");
export const manifestMetadataBody = getElement("manifestMetadataBody");
export const manifestMetadataRowTemplate = getElement<HTMLTemplateElement>("manifestMetadataRowTemplate");
export const manifestMetadataSpace = getElement<HTMLDivElement>("manifestMetadataSpace");
export const manifestLogo = getElement<HTMLImageElement>("manifestLogo");
export const manifestAttribution = getElement<HTMLParagraphElement>("manifestAttribution");
export const manifestLicense = getElement<HTMLAnchorElement>("manifestLicense");
export const manifestSeeAlsoList = getElement<HTMLUListElement>("manifestSeeAlsoList");
export const manifestSeeAlsoListItemTemplate = getElement<HTMLTemplateElement>("manifestSeeAlsoListItemTemplate");

export const errorModal = getElement<HTMLDialogElement>("errorModal");
export const errorModalTrace = getElement("errorModalTrace");
