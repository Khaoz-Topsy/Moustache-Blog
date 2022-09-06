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
    const redirectTemplatePath = './templates/_redirectTemplate.hbs';

    const redirectFoldersToIgnore = [];

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
            documentTitle: metaJsonObj.title,
            post: {
                ...metaJsonObj,
                dateFormatted: customUtil.postDateFormat(metaJsonObj.publishDate),
            },
        };
        const compiledTemplate = templateFunc(templateFullData);
        const templWithContent = compiledTemplate.replace('<slot />', htmlContent);
        const templWithImagesFixed = templWithContent.replaceAll('%7BpostDir%7D', fileDestFolderRel);
        fs.writeFile(fileDest, templWithImagesFixed, ['utf8'], () => { });

        const assetsDir = `${fullDir}/assets`;
        if (fs.existsSync(assetsDir)) {
            const assets = fs.readdirSync(assetsDir);
            for (const assetFile of assets) {
                // if (fs.existsSync(assetFile)) {
                //     fs.de
                // }
                await copyFile(`${assetsDir}/${assetFile}`, `${fileDestFolder}/${assetFile}`);
            }
        }

        // Redirects
        if (metaJsonObj.redirectFrom != null) {
            const redirectFileDestFolder = `./public/${metaJsonObj.redirectFrom}`;
            if (!fs.existsSync(redirectFileDestFolder)) {
                fs.mkdirSync(redirectFileDestFolder);
            }

            const redirectTemplate = await readFile(redirectTemplatePath, 'utf8');
            const redirectTemplateFunc = Handlebars.compile(redirectTemplate);
            const redirectTemplateFullData = {
                title: metaJsonObj.title,
                url: fileDestFolderRel,
            };
            const compiledRedirectTemplate = redirectTemplateFunc(redirectTemplateFullData);
            fs.writeFile(`${redirectFileDestFolder}/index.html`, compiledRedirectTemplate, ['utf8'], () => { });

            redirectFoldersToIgnore.push(`./${metaJsonObj.redirectFrom}/*`);
        }
    }

    // Ignore Redirect files
    fs.writeFile('./public/.gitignore', redirectFoldersToIgnore.join('\n'), ['utf8'], () => { });
}

buildPosts()