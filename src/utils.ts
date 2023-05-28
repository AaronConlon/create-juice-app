import { IConfig } from "./generateConfig.js";
import chalkAnimation from "chalk-animation";
import fetch from "node-fetch";
import figlet from "figlet";
import fs from "fs";
import { globalConfig } from "./config.js";
import gradient from "gradient-string";
import path from "path";
import { showErrorMessage } from "./tips";

export const covertPath = (projectName: string, fileName: string) => {
  const currentDirName = path.basename(process.cwd());
  // @ts-ignore
  if (projectName === currentDirName && globalThis?._sameDir_ !== true) {
    return fileName;
  }
  return `./${projectName}/${fileName}`;
};

export const getExecPackageInstallPath = (projectName: string) => {
  const currentDirName = path.basename(process.cwd());
  // @ts-ignore
  if (projectName === currentDirName && globalThis?._sameDir_ !== true) {
    return ".";
  }
  return `./${projectName}`;
};

export const getDownloadTemplateDir = (projectName: string) => {
  const currentDirName = path.basename(process.cwd());
  // @ts-ignore
  if (projectName === currentDirName && globalThis?._sameDir_ !== true) {
    return ".";
  }
  return `./${projectName}`;
};

export const resolveProjectName = (projectName?: string) => {
  if (!projectName) return;
  if (projectName === ".") {
    // @ts-ignore
    globalThis._sameDir_ = false;
    return path.basename(process.cwd());
  }
  // check if the file or directory is already exist
  const isExistSameNameFileOrDir = fs.existsSync(projectName);
  if (isExistSameNameFileOrDir) {
    showErrorMessage(
      `当前目录下存在 ${projectName} 的同名文件夹或文件，无法创建项目!`
    );
    process.exit(0);
  }
  return projectName;
};

export const showSuccessSlogan = async (answer: IConfig) => {
  const { projectName } = answer;
  const rainbowTitle = chalkAnimation.rainbow(
    `\n\n\tEnjoy this project: ${projectName}!\n\n\tLet's do it. 🚀🚀🚀\n\n`
  );
  rainbowTitle.start();
  await (() => new Promise((resolve) => setTimeout(resolve, 1000 * 2)));
  rainbowTitle.stop();
};

export function createCustomFiglet(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    figlet(text, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const res = gradient.pastel(data);
        resolve(res);
      }
    });
  });
}

// 获取 github 仓库的分支模板选项
export const getBranches = async () => {
  const { githubName: owner, repo } = globalConfig;
  const options = {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Github API Client",
    },
  };
  const url = `https://api.github.com/repos/${owner}/${repo}/branches`;
  const res = await fetch(url, options);
  const data = (await res.json()) as Array<{ name: string }>;
  return data.filter(({ name }) => name !== "main").map(({ name }) => name);
};
