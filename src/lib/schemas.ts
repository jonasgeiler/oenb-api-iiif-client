import * as v from 'valibot';

export const ViewingDirection = {
	LeftToRight: "left-to-right",
	RightToLeft: "right-to-left",
	TopToBottom: "top-to-bottom",
	BottomToTop: "bottom-to-top",
} as const;

export const ViewingHint = {
	Individuals: "individuals",
	Paged: "paged",
	Continuous: "continuous",
	MultiPart: "multi-part",
	NonPaged: "non-paged",
	Top: "top",
	FacingPages: "facing-pages",
} as const;

const OptionalString = v.exactOptional(v.string());

export const TopLevelContextSchema = v.union([v.string(), v.array(v.string())]);
export const ContextSchema = OptionalString;

export const DetailedLanguageSchema = v.object({
	"@value": v.string(),
	"@language": OptionalString,
});

export const LanguagePropertySchema = v.union([
	v.string(),
	DetailedLanguageSchema,
	v.array(v.string()),
	v.array(DetailedLanguageSchema),
]);

export const DetailedURISchema = v.object({
	"@context": ContextSchema,
	"@id": v.string(),
	label: OptionalString,
	format: OptionalString,
	profile: OptionalString,
});

export const URISchema = v.pipe(v.string(), v.url());

export const URIPropertySchema = v.union([
	URISchema,
	DetailedURISchema,
]);

export const RepeatableURIPropertySchema = v.union([
	URISchema,
	DetailedURISchema,
	v.array(URISchema),
	v.array(DetailedURISchema),
]);

export const DetailedServiceSchema = v.object({
	"@context": ContextSchema,
	"@id": v.string(),
	service: URIPropertySchema,
});

export const ServicePropertySchema = v.union([
	v.string(),
	DetailedServiceSchema,
]);

export const ImageSchema = v.object({
	/* Technical Properties  */
	"@id": v.string(),
	"@type": v.pipe(v.string(), v.value("dctypes:Image")),
	format: OptionalString,
	height: v.number(),
	width: v.number(),

	/* Linking Properties */
	service: URIPropertySchema,
});

export const AnnotationSchema = v.object({
	"@context": ContextSchema,

	/* Technical Properties  */
	"@id": v.string(),
	"@type": v.pipe(v.string(), v.value("oa:Annotation")),
	motivation: v.pipe(v.string(), v.value("sc:painting")),

	resource: ImageSchema,
	on: v.string(),
});

export const CanvasSchema = v.object({
	"@context": ContextSchema,

	/* Descriptive Properties */
	label: LanguagePropertySchema,
	metadata: v.exactOptional(v.array(v.object({
		label: LanguagePropertySchema,
		value: LanguagePropertySchema,
	}))),
	description: v.exactOptional(LanguagePropertySchema),

	/* Technical Properties  */
	"@id": v.string(),
	"@type": v.pipe(v.string(), v.value("sc:Canvas")),
	height: v.number(),
	width: v.number(),

	images: v.array(AnnotationSchema),
});

export const SequenceSchema = v.object({
	"@context": ContextSchema,

	/* Descriptive Properties */
	label: v.exactOptional(LanguagePropertySchema),
	metadata: v.exactOptional(v.array(v.object({
		label: LanguagePropertySchema,
		value: LanguagePropertySchema,
	}))),
	description: v.exactOptional(LanguagePropertySchema),
	thumbnail: v.exactOptional(ServicePropertySchema),

	/* Rights and Licensing Properties */
	attribution: v.exactOptional(LanguagePropertySchema),
	license: v.exactOptional(v.union([URISchema, v.array(URISchema)])),
	logo: v.exactOptional(ServicePropertySchema),

	/* Technical Properties  */
	"@id": v.string(),
	"@type": v.pipe(v.string(), v.value("sc:Sequence")),
	viewingDirection: v.exactOptional(v.enum(ViewingDirection)),
	viewingHint: v.exactOptional(v.enum(ViewingHint)),

	/* Linking Properties */
	related: v.exactOptional(RepeatableURIPropertySchema),
	rendering: v.exactOptional(RepeatableURIPropertySchema),
	service: v.exactOptional(RepeatableURIPropertySchema),
	seeAlso: v.exactOptional(RepeatableURIPropertySchema),
	within: v.exactOptional(RepeatableURIPropertySchema),
	startCanvas: v.exactOptional(v.string()),

	canvases: v.array(CanvasSchema),
});

export const ManifestSchema = v.object({
	"@context": TopLevelContextSchema,

	/* Descriptive Properties */
	label: LanguagePropertySchema,
	metadata: v.exactOptional(v.array(v.object({
		label: LanguagePropertySchema,
		value: LanguagePropertySchema,
	}))),
	description: LanguagePropertySchema,
	thumbnail: v.exactOptional(ServicePropertySchema),

	/* Rights and Licensing Properties */
	attribution: LanguagePropertySchema,
	license: v.union([URISchema, v.array(URISchema)]),
	logo: ServicePropertySchema,

	/* Technical Properties  */
	"@id": v.string(),
	"@type": v.pipe(v.string(), v.value("sc:Manifest")),
	viewingDirection: v.enum(ViewingDirection),
	viewingHint: v.enum(ViewingHint),
	navDate: v.exactOptional(v.pipe(v.string(), v.isoTimestamp())),

	/* Linking Properties */
	related: v.exactOptional(RepeatableURIPropertySchema),
	rendering: v.exactOptional(RepeatableURIPropertySchema),
	service: v.exactOptional(RepeatableURIPropertySchema),
	seeAlso: v.exactOptional(RepeatableURIPropertySchema),
	within: v.exactOptional(RepeatableURIPropertySchema),

	/* TODO Manifest Properties */
	sequences: v.array(SequenceSchema),
	structures: v.exactOptional(v.array(v.any())),
});
