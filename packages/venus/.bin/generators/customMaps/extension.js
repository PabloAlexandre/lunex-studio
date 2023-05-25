import { NewExtensionSchema } from "./schemas/extension.js";
import { createFromTemplate, replaceFromTemplate } from "../template.js";
import { createPackage } from "../utils.js";
import { createPackageCLI } from "../cli.js";

function capitalize(str) {
  return str.split('-').join(' ').split(' ').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
}

function createTemplates(info, filePrefix = '', baseFile = '') {
  const basePath = `${baseFile ?  `${baseFile}/src/components/${filePrefix}/` : `${filePrefix}/`}`

  const mapped = info.map((item) => { 
    const filePath = `${(item?.id || item?.category || 'file').split(' ').join('-').toLowerCase()}${filePrefix ? '.'+filePrefix: ''}`;
    const filename = `${basePath}${filePath}.tsx`

    const templateInfo = {
      id: item.id?.toLowerCase(),
      title: item.title || "",
      fileTitle: capitalize(item?.id || item?.category),
    }

    if(filePrefix === 'panels') {
      templateInfo.side = item.side;
      createFromTemplate(filename, 'components/panel.template', templateInfo);
    }

    if(filePrefix === 'windows') {
      templateInfo.canClose = item.canClose;
      templateInfo.isEditable = item.isEditable;

      createFromTemplate(filename, 'components/window.template', templateInfo);
    }

    if(filePrefix === 'commands') {
      templateInfo.category = item.category;
      templateInfo.commands = item?.info?.map((command) => {
        return replaceFromTemplate('components/command-item.template', command)
      })?.join(',\n  ') || "";

      createFromTemplate(filename, 'components/command.template', templateInfo);
    }

    return {
      basePath,
      filePath,
      fileTitle: templateInfo.fileTitle,
    }
  })

  const mapper = {
    'windows': "Window",
    'panels': "Panel",
    'commands': "CommandsConfig",
  }
  const packageInfo = {
    imports: mapped.map((item) => replaceFromTemplate('import.template', {
      name: item.fileTitle+mapper[filePrefix],
      package: `./${item.filePath}`,
    })).join('/n'),
    [filePrefix]: mapped.map(it => it.fileTitle+mapper[filePrefix]).join(',\n  '),
  }

  createFromTemplate(`${basePath}index.tsx`, filePrefix+'.template', packageInfo);
}


export const NewExtesion = {
  generate: async (info) => {
    const handler = async () => {
      const packageFile = await createPackage(info, 'extensions');
      const { panels, windows, commands } = info.customMap;
      const imports = [];

      if(panels) {
        createTemplates(panels, 'panels', packageFile);
        imports.push({
          name: 'PanelsConfig',
          package: './components/panels'
        })
      }
      if(windows) {
        createTemplates(windows, 'windows', packageFile);

        imports.push({
          name: 'WindowsConfig',
          package: './components/windows'
        })
      }
      if(commands) {
        createTemplates(commands, 'commands', packageFile);

        imports.push({
          name: 'CommandsConfig',
          package: './components/commands'
        })
      }

      createFromTemplate(`${packageFile}/src/index.tsx`, 'plugin.template', {
        imports: imports.map((item) => replaceFromTemplate('import.template', item)).join('\n'),
        plugins: imports.map((item) => item.name).join(',\n    '),
        fileTitle: capitalize(info.name),
      });
    }
    
    await createPackageCLI(info.name, handler)
  },
  fields: NewExtensionSchema
}