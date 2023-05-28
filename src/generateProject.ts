import { covertPath, getExecPath } from "./utils";

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
      getExecPath(projectName),
      { clone: true },
      (err: string) => {
        if (err) {
          console.log(err);
          showErrorMessage("下载模板失败，请检查网络是否正常");
          process.exit(1);
        }
        resolve(true);
      }
    );
  });
};

const replaceConfigToTemplate = async (config: IConfig) => {
  const { projectName } = config;
  const packageJsonPath = covertPath(projectName, "package.json");
  const readmePath = covertPath(projectName, "README.md");
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
  const envPath = covertPath(projectName, ".env");
  const rawEnv = await fs.readFile(envPath, "utf-8");
  const newEnv = rawEnv
    .replace(/{{backendApi}}/g, config.backendApi)
    .replace(/{{port}}/g, config.port);
  await fs.writeFile(envPath, newEnv, { encoding: "utf-8" });
};

async function removeGitGithub(dirPath: string) {
  const gitPath = covertPath(dirPath, ".git");
  const githubPath = covertPath(dirPath, ".github");
  try {
    await Promise.allSettled([
      fs.rm(gitPath, { recursive: true, force: true }),
      fs.rm(githubPath, { recursive: true, force: true }),
    ]);
  } catch (err) {}
}

const installDependencies = async (config: IConfig, onSuccess: () => void) => {
  const { projectName, packageManager } = config;
  const spinner = createSpinner("安装依赖...").start();
  const installCommandMap = {
    npm: "npm install",
    yarn: "yarn",
    pnpm: "pnpm install",
  };
  await removeGitGithub(`./${projectName}`);
  // check package manager command exists
  const installCommand = installCommandMap[packageManager];
  exec(`${packageManager} --version`, (err) => {
    if (err) {
      // 命令不存在，则安装
      exec(`npm install -g ${packageManager}`, (err, _, __) => {
        showErrorMessage('安装依赖失败，请检查是否安装了"npm"或"yarn"或"pnpm"');
        showErrorMessage(err);
        showErrorMessage("std out:", _);
        showErrorMessage("std error:", __);
      });
    }
    exec(installCommand, { cwd: getExecPath(projectName) }, (err: any) => {
      if (err) {
        showErrorMessage("安装依赖失败，请检查网络是否正常");
        process.exit(1);
      }
      spinner.success({ text: "安装依赖成功" });
      onSuccess();
    });
  });
};

export const generateProject = async (config: IConfig): Promise<any> => {
  const { template, projectName } = config;
  let spinner = createSpinner("拉取文件...").start();
  // 下载模板
  await downloadTemplate(template, projectName);
  spinner.success({ text: "拉取文件成功" });

  // 更新配置和安装依赖
  spinner = createSpinner("初始化项目配置...").start();
  await replaceConfigToTemplate(config);
  spinner.success({ text: "项目配置成功" });

  return new Promise((resolve) => {
    installDependencies(config, () => {
      resolve(true);
    });
  });
};
