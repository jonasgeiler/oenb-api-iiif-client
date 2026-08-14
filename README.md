# ÖNB-API-IIIF Viewer

> A simple viewer for the Austrian National Library IIIF API, so I can learn
> how to use IIIF.

I am currently trying to learn about IIIF (International Image Interoperability
Framework; pronounced “Triple-Eye-Eff”) and thought it would be a fun project to
make a little viewer for the [ÖNB-API-IIIF][onb-api-iiif], which is an IIIF API
provided by the Austrian National Library.

This project MIGHT work for other IIIF APIs, from other institutions, but I am
mainly focusing on the [ÖNB-API-IIIF][onb-api-iiif] for now.
Also, it is very basic by design. This is just supposed to be a weekend project.

> [!TIP]
> #### Try it out over at:
> ### https://onb-api-iiif-viewer.jonasgeiler.com

## About [ÖNB-API-IIIF][onb-api-iiif]

[ÖNB-API-IIIF][onb-api-iiif] is based on the project “Simple Access to Cultural
Heritage Assets” (SACHA) a cooperation project between the Austrian National
Library and the Austrian Centre for Digital Humanities (ACDH) of the Austrian
Academy of Sciences. SACHA is part of Austria’s contribution to the European
Research Infrastructure Consortium (ERIC) DARIAH. The aim of the project is to
improve access to culturally relevant data, such as the digitized historical
book collection of the Austrian National Library, for scientific use.

See also:
- https://www.onb.ac.at/forschung/forschungsaktivitaeten/sacha/
- https://www.oeaw.ac.at/acdh/tools/sacha/

*(Source: https://iiif.onb.ac.at/api/#_introduction)*

## Local development

Install dependencies:

```sh
pnpm install
```

Run development server:

```sh
pnpm run dev
```

## AI Usage Disclosure

This project is human-made, with a few exceptions where I consulted
[ChatGPT] for some design decisions or assistance with particular
issues, as long as the information could not be quickly found elsewhere.\
The [language utils file] is the only AI-generated part of the codebase,
which I did to save some time. I wanted to learn about IIIF after all, not
[RFC 4647] language tag matching algorithms.\
However, I ensure that all AI-generated code is reviewed by a human
before implementation.\
To the best of my knowledge, no other AI has been used in the development
process.\
All code not mentioned here was written by myself using my wet thinking brain 🧠.

[onb-api-iiif]: https://iiif.onb.ac.at/api/
[ChatGPT]: https://chatgpt.com/
[language utils file]: ./src/utils/language.ts
[RFC 4647]: https://datatracker.ietf.org/doc/html/rfc4647
