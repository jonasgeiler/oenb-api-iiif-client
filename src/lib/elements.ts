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
export const manifestLabel = getElement<HTMLHeadingElement>("manifestLabel");
export const manifestDescription = getElement<HTMLParagraphElement>("manifestDescription");
export const manifestMetadataBody = getElement("manifestMetadataBody");
export const manifestMetadataRowTemplate = getElement<HTMLTemplateElement>("manifestMetadataRowTemplate");
export const manifestLogo = getElement<HTMLImageElement>("manifestLogo");
export const manifestAttribution = getElement<HTMLParagraphElement>("manifestAttribution");
export const manifestLicense = getElement<HTMLAnchorElement>("manifestLicense");
export const manifestSeeAlsoList = getElement<HTMLUListElement>("manifestSeeAlsoList");
export const manifestSeeAlsoListItemTemplate = getElement<HTMLTemplateElement>("manifestSeeAlsoListItemTemplate");

export const errorModal = getElement<HTMLDialogElement>("errorModal");
export const errorModalTrace = getElement("errorModalTrace");
