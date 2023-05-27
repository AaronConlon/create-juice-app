import { IConfig } from "./generateConfig";
import { createSpinner } from "nanospinner";
import download from "download-git-repo";
import { exec } from "child_process";
import fs from "fs/promises";
import { globalConfig } from "./config";
import { showErrorMessage } from "./tips";

const downloadTemplate = async (templateName: string, projectName: string) => {
  const { githubName, cliName } = globalConfig;
  return new Promise((resolve) => {
    download(
      `direct:https://github.com/${githubName}/${cliName}#${templateName}`,
      projectName,
      { clone: true },
      (err: string) => {
        if (err) {
          showErrorMessage("下载模板失败，请检查网络是否正常");
          process.exit(1);
        }
        resolve(true);
      }
    );
  });
};

const replaceConfigToTemplate = async (config: IConfig) => {
  const { template, projectName } = config;
  const packageJsonPath = `./${projectName}/package.json`;
  const readmePath = `./${projectName}/README.md`;
  // 读取 package.json
  const rawPackageJson = await fs.readFile(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(rawPackageJson) as Record<string, any>;
  packageJson.author = config.author;
  packageJson.description = config.description;
  packageJson.name = config.projectName;
  // 写入 package.json
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), {
    encoding: "utf-8",
  });
  // 读取 README.md
  const rawReadme = await fs.readFile(readmePath, "utf-8");
  // 替换 README.md
  const newReadme = rawReadme
    .replace(/{{projectName}}/g, config.projectName)
    .replace(/{{description}}/g, config.description)
    .replace(/{{author}}/g, config.author);
  // 写入 README.md
  await fs.writeFile(readmePath, newReadme, { encoding: "utf-8" });
  // 更新 .env 文件
  const envPath = `./${projectName}/.env`;
  const rawEnv = await fs.readFile(envPath, "utf-8");
  const newEnv = rawEnv
    .replace(/{{backendApi}}/g, config.backendApi)
    .replace(/{{port}}/g, config.port);
  await fs.writeFile(envPath, newEnv, { encoding: "utf-8" });
};

const installDependencies = async (config: IConfig, onSuccess: () => void) => {
  const { projectName, packageManager } = config;
  const spinner = createSpinner("安装依赖中...").start();
  const installCommand = {
    npm: "npm install",
    yarn: "yarn",
    pnpm: "pnpm install",
  };
  await fs.rm(`./${projectName}/.git`, { recursive: true });
  await fs.rm(`./${projectName}/.github`, { recursive: true });
  await fs.rm(`./${projectName}/.gitignore`, { recursive: true });
  // install dependencies
  // exec install command
  exec(
    installCommand[packageManager],
    { cwd: `./${projectName}` },
    (err: any) => {
      if (err) {
        showErrorMessage("安装依赖失败，请检查网络是否正常");
        process.exit(1);
      }
      spinner.success({ text: "安装依赖成功" });
      onSuccess();
    }
  );
};

export const generateProject = async (config: IConfig) => {
  const { template, projectName } = config;
  let spinner = createSpinner("拉取文件中...").start();
  // 下载模板
  await downloadTemplate(template, projectName);
  spinner.success({ text: "拉取文件成功" });
  spinner.update({ text: "初始化项目配置..." }).start();
  // 更新配置和安装依赖
  await replaceConfigToTemplate(config);
  return new Promise((resolve) => {
    installDependencies(config, () => {
      spinner.success({ text: "初始化项目配置成功" });
      resolve(true);
    });
  });
};
