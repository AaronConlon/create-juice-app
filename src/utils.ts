import { IConfig } from "./generateConfig.js";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import fs from "fs";
import gradient from "gradient-string";
import { showErrorMessage } from "./tips.js";

export const resolveProjectName = (projectName?: string) => {
  if (!projectName) return;
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
