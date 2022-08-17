const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const setup = require('./setupHandleBars');

const miscDir = './templates/misc';

async function buildMisc() {
    setup.setupHandlebars();

    const projectDataContents = await readFile('./data/generated/_project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    setup.buildCollectionOfHbsFiles(miscDir, projectData, '');

    // for (const redirect of projectData.redirects) {
    //     if (!fs.existsSync(redirect.pattern)) {
    //         fs.mkdirSync(redirect.pattern);
    //     }

    //     const template = await readFile('./seo/handlebar/redirect.hbs', 'utf8');
    //     const templateFunc = Handlebars.compile(template);
    //     const templateData = {
    //         title: redirect.pattern,
    //         url: redirect.url
    //     };

    //     const compiledTemplate = templateFunc(templateData);
    //     fs.writeFile(`./${redirect.pattern}/index.html`, compiledTemplate, ['utf8'], () => { });
    // }
}

buildMisc()