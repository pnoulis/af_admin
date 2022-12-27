/*
    https://en.wikipedia.org/wiki/IETF_language_tag
    https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    ISO 639 -> the standard's family used to classify languages.
    ISO 639-1 -> two letter codes, using native script translated into english
    ISO 639-2/T -> three letter codes, using english script
    ISO 639-2/B -> three letter codes, usingc native script translated into english
    ISO 639-3 -> macrolanguages
*/
export const langs = [
    {
        name: 'AmericanEnglish',
        bcp47: 'en-US',
        iso639_1: 'en',
        iso639_2T: 'eng',
        iso639_2B: 'eng',
        iso639_3: 'eng',
    },
    {
        name: 'French',
        iso639_1: 'fr',
        bcp47: 'fr',
        iso639_2T: '',
        iso639_2B: '',
        iso639_3: '',
    },
    {
        name: 'German',
        iso639_1: 'de',
        bcp47: 'de',
        iso639_2T: '',
        iso639_2B: '',
        iso639_3: '',
    },
    {
        name: 'Dutch',
        iso639_1: 'nl',
        bcp47: 'nl',
        iso639_2T: '',
        iso639_2B: '',
        iso639_3: '',
    },
];