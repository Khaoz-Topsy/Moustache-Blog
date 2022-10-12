const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const pjson = require('../../package.json');
const customUtil = require('./util');

async function generateFullJson() {
    process.env['NODE_ENV'] = pjson.version;

    const siteMetaContents = await readFile('./data/_siteMeta.json', 'utf8');
    let siteData = JSON.parse(siteMetaContents);

    console.log(`Reading base json files`);
    const baseJsonData = await readJsonFilesInDir('./data', siteData);
    siteData = { ...baseJsonData };

    console.log(`Reading generated json files`);
    const generatedJsonData = await readJsonFilesInDir('./data/generated', siteData);
    siteData = { ...generatedJsonData };

    console.log(`Reading post json files`);
    const postJsonData = await readPostJsonFiles(siteData);
    siteData = { ...postJsonData };

    console.log(`Reading JSON LD Schema`);
    siteData.jsonSchema = await readFile('./data/_schema.json', 'utf8');

    console.log(`Compiling CSP rules`);
    const cspContents = await readFile('./data/_csp.json', 'utf8');
    const cspContent = JSON.parse(cspContents);
    const headerList = cspContent.options.map(opt =>
        opt.name +
        ((opt.values != null && opt.values.length > 0) ? ' ' : '') +
        opt.values.join(' ')
    );
    const header = headerList.join('; ') + ';';

    const siteDataFull = {
        ...siteData,
        version: pjson.version,
        headers: [
            ...cspContent.headers.map(csp => ({ "name": csp, "value": header })),
            ...(siteData.headers ?? []),
        ]
    };

    const projectString = JSON.stringify(siteDataFull);
    fs.writeFile(`./data/generated/_project.json`, projectString, ['utf8'], () => { });
    fs.writeFile(`./public/assets/json/project.json`, projectString, ['utf8'], () => { });
    console.log(`Successfully compiled _project.json`);
}

async function readJsonFilesInDir(relativeDir, currentSiteData) {
    let result = { ...currentSiteData };

    const allJsonFiles = fs.readdirSync(relativeDir, { withFileTypes: true });
    for (const dirent of allJsonFiles) {
        if (dirent.isDirectory()) continue;
        if (dirent.name[0] == ".") continue;
        if (dirent.name[0] == "_") continue;

        const fullFileName = dirent.name;
        const fileName = fullFileName.replace('.json', '');

        console.log(`\tReading ${fullFileName} file`);
        const jsonFileContents = await readFile(`${relativeDir}/${fullFileName}`, 'utf8');
        let jsonObj = JSON.parse(jsonFileContents);
        result = {
            ...result,
            [fileName]: { ...jsonObj }
        }
    }

    return result;
}

async function readPostJsonFiles(siteData) {
    const postsFolderPath = './content/posts';
    let posts = [];

    const postFolders = fs.readdirSync(postsFolderPath, { withFileTypes: true });
    const postDirs = postFolders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    for (const dir of postDirs) {
        console.log(`\tReading ${dir} post`);
        const metaFilePath = `${postsFolderPath}/${dir}/meta.json`;
        if (fs.existsSync(metaFilePath) == false) {
            console.log(`\tPost folder '${dir}' does not contain a meta.json file`);
            continue;
        }

        const metaJsonFileContents = await readFile(metaFilePath, 'utf8');
        const metaJsonObj = JSON.parse(metaJsonFileContents);

        if (metaJsonObj.draft) continue;

        const postUrlPath = `${siteData.baseUrl}posts/${metaJsonObj.url}/`;
        metaJsonObj.relImageUrl = `posts/${metaJsonObj.url}/${metaJsonObj.imageUrl}`;
        metaJsonObj.imageUrl = `${postUrlPath}${metaJsonObj.imageUrl}`;
        posts.push({
            ...metaJsonObj,
            meta: {
                title: customUtil.fallbackValues(metaJsonObj.meta?.title, metaJsonObj.title, ''),
                description: customUtil.fallbackValues(metaJsonObj.meta?.description, metaJsonObj.description, ''),
            },
            twitter: {
                title: customUtil.fallbackValues(metaJsonObj.twitter?.title, metaJsonObj.title, ''),
                description: customUtil.fallbackValues(metaJsonObj.twitter?.description, metaJsonObj.description, ''),
                imageUrl: customUtil.fallbackValues(metaJsonObj.twitter?.imageUrl, metaJsonObj.imageUrl, ''),
            },
            facebook: {
                title: customUtil.fallbackValues(metaJsonObj.facebook?.title, metaJsonObj.title, ''),
                description: customUtil.fallbackValues(metaJsonObj.facebook?.description, metaJsonObj.description, ''),
                imageUrl: customUtil.fallbackValues(metaJsonObj.facebook?.imageUrl, metaJsonObj.imageUrl, ''),
            }
        });
    }

    posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    return {
        ...siteData,
        posts: [...posts],
    };
}


generateFullJson();
