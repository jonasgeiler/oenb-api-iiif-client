// @ts-expect-error We are checking if the Sanitizer API is even available.
if (!(Element.prototype.setHTML instanceof Function)) {
	// If Sanitizer API is not supported, import polyfill.
	// @ts-expect-error There is no typing for this polyfill available - whatever.
	await import("@aegisjsproject/sanitizer/polyfill.js");
}

let sanitizer: SanitizerConfig | Sanitizer = {
	// As recommended in https://iiif.io/api/presentation/2.1/#html-markup-in-property-values
	elements: [
		{
			name: "a",
			attributes: ["href"]
		},
		{
			name: "b",
			attributes: []
		},
		{
			name: "br",
			attributes: []
		},
		{
			name: "i",
			attributes: []
		},
		{
			name: "img",
			attributes: ["src", "alt"]
		},
		{
			name: "p",
			attributes: []
		},
		{
			name: "span",
			attributes: []
		},
	],
	comments: false,
};
if ('Sanitizer' in window) {
	// If supported, create an actual Sanitizer instance.
	sanitizer = new Sanitizer(sanitizer);
}

/** Sets the DOM of given element to the sanitized and styled HTML string */
export function setHTML(element: Element, html: string) {
	// @ts-expect-error For some reason there's no typing for the Sanitizer API.
	element.setHTML(
		// Quick fix for special first word formatting in some manifests.
		html.replace(/<<([^>]*)>>/gi, "&lt&lt$1&gt;&gt;"),
		{ sanitizer },
	);
}
