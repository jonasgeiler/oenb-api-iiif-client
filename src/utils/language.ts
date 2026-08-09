import type { LanguagePropertySchema } from "../lib/schemas.ts";
import type { InferOutput } from "valibot";

type LanguageProperty = InferOutput<typeof LanguagePropertySchema>;

const languagePreferences = [
	// The document language is always the most preferred language.
	document.documentElement.lang,
	// Afterward, just use the user's preferred languages.
	...navigator.languages,
];

export function stringifyLanguageProperty(input: LanguageProperty): string {
	const values = normalizeValues(input);
	if (values.length === 0) {
		return "";
	}

	// Rule 1:
	// If none of the values have a language, display all values.
	const hasLanguage = values.some((value) => value.language !== undefined);
	if (!hasLanguage) {
		return values.map((value) => value.text).join(", ");
	}

	// Rule 2:
	// Find the best matching language preference.
	for (const preference of languagePreferences) {
		const matches = values.filter(
			(value) =>
				value.language !== undefined &&
				languageMatches(value.language, preference)
		);

		if (matches.length > 0) {
			return matches.map((value) => value.text).join(", ");
		}
	}

	// Rule 3:
	// Some values have languages, but none match.
	// If there are untagged values, display those.
	const untagged = values.filter((value) => value.language === undefined);
	if (untagged.length > 0) {
		return untagged.map((value) => value.text).join(", ");
	}

	// Rule 4:
	// All values have a language, but none match.
	// Select one language and display all values in that language.
	const fallbackLanguage = values[0]!.language!;
	return values
		.filter((value) => value.language === fallbackLanguage)
		.map((value) => value.text)
		.join(", ");
}

function normalizeValues(input: LanguageProperty): {
	text: string;
	language?: string;
}[] {
	if (typeof input === "string") {
		return [{ text: input }];
	}

	if (Array.isArray(input)) {
		return input.flatMap((item) => normalizeValues(item));
	}

	return [
		{
			text: input["@value"],
			language: input["@language"],
		},
	];
}

function languageMatches(
	valueLanguage: string,
	preferredLanguage: string
): boolean {
	const value = normalizeLanguage(valueLanguage);
	const preferred = normalizeLanguage(preferredLanguage);

	// Exact match: "de" === "de"
	if (value === preferred) {
		return true;
	}

	// Language-family match:
	// "de-AT" matches "de"
	// "de" matches "de-AT"
	return (
		value.startsWith(`${preferred}-`) ||
		preferred.startsWith(`${value}-`)
	);
}

const LANGUAGE_ALIASES: Record<string, string> = {
	ger: "de",
	deu: "de",
	eng: "en",
	fre: "fr",
	fra: "fr",
	ita: "it",
	spa: "es",
	lat: "la",
};

function normalizeLanguage(language: string): string {
	// Presentation API 2.1 examples commonly use values such as
	// "en", "de", "ger", etc.
	const normalized = language.toLowerCase();

	return LANGUAGE_ALIASES[normalized] ?? normalized;
}
