import { errorModal, errorModalTrace } from "../lib/elements.ts";

export function displayError(error: Error): never {
	console.error(error); // To make sure nothing is missed we'll also log it.

	if (error?.name && error.message) {
		errorModalTrace.textContent = `${error.name}: ${error.message}`;

		// Error.stack is not available in all browsers.
		const stack = error.stack as string | undefined;
		if (stack) {
			errorModalTrace.textContent += '\n\t' + stack
				// Indent stack trace.
				.replace(/(\n+)/, "$1\t");
		}
	} else {
		errorModalTrace.textContent = '(N/A)';
	}

	ui(errorModal);
	throw error;
}
