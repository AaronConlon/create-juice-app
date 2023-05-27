#!/usr/bin/env node

import {
  createCustomFiglet,
  resolveProjectName,
  showProcessMessage,
} from "./utils";

import { generateConfig } from "./generateConfig";
import { generateProject } from "./generateProject";
import { program } from "commander";

(async () => {
  const customHelpText = await createCustomFiglet("Juice Scaffold");
  program
    .version("0.0.1")
    .option("-t, --template <template name>", "模板名称")
    .argument("[project name]", "项目名称")
    .action(async (projectName, cmdObj: { template?: string }) => {
      // 首先，根据项目名称，创建项目文件夹
      const _projectName = resolveProjectName(projectName);
      // 如果未指定项目名称，则让用户输入项目名
      const answers = await generateConfig(_projectName, cmdObj?.template);
      await showProcessMessage(answers, async () => {
        await generateProject(answers);
      });
    })
    .addHelpText("before", customHelpText);
  program.parse(process.argv);
})();
