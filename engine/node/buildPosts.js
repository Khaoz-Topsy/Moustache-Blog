const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');
const readFile = util.promisify(fs.readFile);
const copyFile = util.promisify(fs.copyFile);

const setup = require('./setupHandleBars');
const customUtil = require('./util');

async function buildPosts() {
    setup.setupHandlebars();

    const projectDataContents = await readFile('./data/generated/_project.json', 'utf8');
    const projectData = JSON.parse(projectDataContents);

    const fullFileName = './templates/_postTemplate.hbs';

    const postsFolderPath = './content/posts';
    const postFolders = fs.readdirSync(postsFolderPath, { withFileTypes: true });
    const postDirs = postFolders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    for (const dir of postDirs) {
        const fullDir = `${postsFolderPath}/${dir}`;
        const metaFilePath = `${fullDir}/meta.json`;
        const contentFilePath = `${fullDir}/content.md`;
        if (fs.existsSync(metaFilePath) == false) {
            console.log(`Post folder '${dir}' does not contain a meta.json file`);
            continue;
        }

        const metaJsonFileContents = await readFile(metaFilePath, 'utf8');
        const metaJsonObj = JSON.parse(metaJsonFileContents);

        const content = await readFile(contentFilePath, "utf8");
        const htmlContent = await customUtil.convertMarkdownToHtml(content);

        const fileDestFolderRel = `/posts/${metaJsonObj.url}`;
        const fileDestFolder = `./public${fileDestFolderRel}`;
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
        const templWithContent = compiledTemplate.replace('<slot />', htmlContent);
        const templWithImagesFixed = templWithContent.replaceAll('%7BpostDir%7D', fileDestFolderRel);
        fs.writeFile(fileDest, templWithImagesFixed, ['utf8'], () => { });

        const assetsDir = `${fullDir}/assets`;
        const assets = fs.readdirSync(assetsDir);
        for (const assetFile of assets) {
            await copyFile(`${assetsDir}/${assetFile}`, `${fileDestFolder}/${assetFile}`);
        }
        await copyFile(`${fullDir}/${metaJsonObj.imageUrl}`, `${fileDestFolder}/${metaJsonObj.imageUrl}`);
    }
}

buildPosts()