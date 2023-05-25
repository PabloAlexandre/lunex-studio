import rushLib from '@microsoft/rush-lib';
import fs from 'fs';

export function copyFolderRecursive(folder, targetFolder) {
  if(!fs.lstatSync(folder).isDirectory()) return;

  const files = fs.readdirSync(folder);
  files.forEach((file) => {
    const curSource = `${folder}/${file}`;
    const curTarget = `${targetFolder}/${file}`;

    if(fs.lstatSync(curSource).isDirectory()) {
      fs.mkdirSync(curTarget);
      copyFolderRecursive(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const RushConfiguration = rushLib.RushConfiguration.loadFromDefaultLocation({
  startingFolder: process.cwd()
});

export const { rushJsonFile: rushConfigPath, rushJsonFolder: rootDir } = RushConfiguration;

export const packagesDir = `${rootDir}/packages`;
export const templateFolder = `${rootDir}/packages/venus/templates`;

export function folderExists(folder) {
  return fs.existsSync(folder);
}

export function createPackageFolder(folder, templateName) {
  const packageFolder = `${packagesDir}/${folder}`;
  if(folderExists(packageFolder)) throw new Error('Package already exists');

  fs.mkdirSync(packageFolder, { recursive: true });
  copyFolderRecursive(`${templateFolder}/${templateName}`, packageFolder);

  return packageFolder;
}

export function updateJSONFile(file, cb) {
  let data = fs.readFileSync(file, 'utf8');
  const jsonData = JSON.parse(data);

  data = cb(jsonData);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

export function createPackage(packageInfo, templateName) {
  const type = packageInfo.customMap.libType || 'extensions';

  const packageName = type === 'core' ? `@lunex/${packageInfo.name}` : `@lunex-extensions/${packageInfo.name}`;

  const outputDir = `${type}/${packageInfo.name}`;

  const packageFolder = createPackageFolder(outputDir, templateName);
  
  updateJSONFile(`${packageFolder}/package.json`, (data) => ({
    ...data,
    name: packageName,
    description: packageInfo.description,
  }));

  updateJSONFile(`${rootDir}/rush.json`, (data) => ({
    ...data,
    projects: [
      ...data.projects,
      {
        packageName: packageName,
        projectFolder: `packages/${outputDir}`,
        tags: [ `${type}/${packageInfo.name}` ],
      }
    ]
  }));

  return packageFolder;
}