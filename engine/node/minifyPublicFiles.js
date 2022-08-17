const fs = require('fs');
const minify = require('minify');

const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        processScripts: ['application/ld+json']
    },
    css: {
        compatibility: '*',
        properties: {
            urlQuotes: true
        }
    },
    js: {
        ecma: 5,
    },
};

const filesToMinify = [
    'index.html',
    'Contributors.html',
    'Downloads.html',
    'ThankYou.html',
    'assets/css/base.css',
    'assets/css/main.css',
];

for (let fileIndex = 0; fileIndex < filesToMinify.length; fileIndex++) {
    const fileToMinify = filesToMinify[fileIndex];
    minify(`./${fileToMinify}`, options)
        .then((newContents) => {
            fs.writeFile(`${fileToMinify}`, newContents, ['utf8'], () => { });
        })
        .catch(console.error);
}


