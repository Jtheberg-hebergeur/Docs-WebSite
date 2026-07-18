import lunr from "C:\\Users\\kylia\\Documents\\GitHub\\Docs-WebSite\\node_modules\\lunr\\lunr.js";
require("C:\\Users\\kylia\\Documents\\GitHub\\Docs-WebSite\\node_modules\\lunr-languages\\lunr.stemmer.support.js")(lunr);
require("C:\\Users\\kylia\\Documents\\GitHub\\Docs-WebSite\\node_modules\\lunr-languages\\lunr.fr.js")(lunr);
require("C:\\Users\\kylia\\Documents\\GitHub\\Docs-WebSite\\node_modules\\lunr-languages\\lunr.multi.js")(lunr);
export const removeDefaultStopWordFilter = [];
export const language = ["fr","en"];
export const searchIndexUrl = "search-index{dir}.json?_=a5a90011";
export const searchResultLimits = 8;
export const fuzzyMatchingDistance = 1;