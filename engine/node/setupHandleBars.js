const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');
const readFile = util.promisify(fs.readFile);

async function setupHandlebars() {

    const siteMetaContents = await readFile('./data/_siteMeta.json', 'utf8');
    let siteData = JSON.parse(siteMetaContents);

    process.env['NODE_ENV'] = require('../../package.json').version;
    process.env['CUSTOM_REFID'] = siteData.refId ?? 'khaozBlog';

    forEachFileInDir(
        './engine/helpers', '.helper.js',
        (fileWithoutExtension, fullFileName) => Handlebars.registerHelper(fileWithoutExtension, require(`../helpers/${fullFileName}`))
    );

    forEachFileInDir(
        './templates/components', '.hbs',
        (fileWithoutExtension, fullFileName) => Handlebars.registerPartial(`components/${fileWithoutExtension}`, require(`../../templates/components/${fullFileName}`))
    );
}


async function forEachFileInDir(dir, extensionToRemove, perFileFunc) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of files) {
        if (dirent.isDirectory()) continue;

        const fullFileName = dirent.name;
        const fileWithoutExtension = fullFileName.replace(extensionToRemove, '');

        perFileFunc(fileWithoutExtension, fullFileName);
    }
}

async function buildCollectionOfHbsFiles(directory, projectData, replaceExtensionWith) {
    const allTemplates = fs.readdirSync(directory, { withFileTypes: true });
    for (const dirent of allTemplates) {
        if (dirent.isDirectory()) continue;
        if (dirent.name[0] == "_") continue;

        const fullFileName = dirent.name;
        if (fullFileName.substring(fullFileName.length - 4, fullFileName.length) != '.hbs') continue;

        const fileName = fullFileName.replace('.hbs', replaceExtensionWith);

        const templateFilePath = `${directory}/${fullFileName}`;
        const fileDest = `./public/${fileName}`;

        const template = await readFile(templateFilePath, 'utf8');
        const templateFunc = Handlebars.compile(template);
        const compiledTemplate = templateFunc(projectData);
        fs.writeFile(fileDest, compiledTemplate, ['utf8'], () => { });
    }
}

module.exports = {
    setupHandlebars: setupHandlebars,
    buildCollectionOfHbsFiles: buildCollectionOfHbsFiles,
}
