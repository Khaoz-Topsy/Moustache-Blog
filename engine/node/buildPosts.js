const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');
const readFile = util.promisify(fs.readFile);

const setup = require('./setupHandleBars');

async function buildPosts() {
    setup.setupHandlebars();

    const projectDataContents = await readFile('./data/generated/_project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    const fullFileName = './templates/_postTemplate.hbs';

    const postsFolderPath = './content/posts';
    const postFolders = fs.readdirSync(postsFolderPath, { withFileTypes: true });
    const postDirs = postFolders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    for (const dir of postDirs) {
        const metaFilePath = `${postsFolderPath}/${dir}/meta.json`;
        if (fs.existsSync(metaFilePath) == false) {
            console.log(`Post folder '${dir}' does not contain a meta.json file`);
            continue;
        }

        const metaJsonFileContents = await readFile(metaFilePath, 'utf8');
        const metaJsonObj = JSON.parse(metaJsonFileContents);

        const fileDestFolder = `./public/${metaJsonObj.url}`;
        const fileDest = `${fileDestFolder}/index.html`;

        if (!fs.existsSync(fileDestFolder)) {
            fs.mkdirSync(fileDestFolder);
        }

        const template = await readFile(fullFileName, 'utf8');
        const templateFunc = Handlebars.compile(template);
        const templateFullData = {
            ...projectData,
            post: { ...metaJsonObj },
        };
        const compiledTemplate = templateFunc(templateFullData);
        fs.writeFile(fileDest, compiledTemplate, ['utf8'], () => { });
    }
}

buildPosts()