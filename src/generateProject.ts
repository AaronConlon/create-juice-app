import { IConfig } from "./generateConfig";
import download from "download-git-repo";
import { globalConfig } from "./config";

const downloadTemplate = async (templateName: string, projectName: string) => {
  const { githubName, cliName } = globalConfig;
  await download(
    `direct:https://github.com/${githubName}/${cliName}#${templateName}`,
    projectName,
    { clone: true },
    (err: string) => {
      console.log(err ? err : "Success");
    }
  );
};

export const generateProject = async (config: IConfig) => {
  const { template, projectName } = config;
  // 下载模板
  await downloadTemplate(template, projectName);
  // 生成 package.json
  // 安装依赖
  // 生成 README.md
  // 生成 .gitignore
  // 生成 .env
};
