#!/usr/bin/env node

import {
  createCustomFiglet,
  resolveProjectName,
  showProcessMessage,
  showSuccessMessage,
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
      console.log("answers: ", answers);

      await showProcessMessage(
        answers.projectName ?? projectName,
        answers.description,
        async () => {
          console.log("loading...");
          await generateProject(answers);
        }
      );
      // 然后，根据模板名称，下载模板
      console.log(`cmdObject: ${JSON.stringify(cmdObj)}`);
      await showSuccessMessage(projectName);
    })
    .addHelpText("before", customHelpText);
  program.parse(process.argv);
})();
