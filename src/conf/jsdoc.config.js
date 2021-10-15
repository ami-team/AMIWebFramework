'use strict';

module.exports = {
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "source": {
        "include": ["../core/"],
        "includePattern": ".js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "opts": {
        "template": ".",
        "destination": "../core/"
    }
}