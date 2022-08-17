const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const setup = require('./setupHandleBars');

const pagesDir = './templates/pages';

async function buildPages() {
    setup.setupHandlebars();

    const projectDataContents = await readFile('./data/generated/_project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    setup.buildCollectionOfHbsFiles(pagesDir, projectData, '.html');
}

buildPages()