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

export const showProcessMessage = async (
  answer: IConfig,
  fetchTemplate: () => Promise<void>
) => {
  const { projectName, description } = answer;
  const rainbowTitle = chalkAnimation.rainbow(
    `\n\tLet's create our project: ${projectName}!\n\n\t${description}\n`
  );
  rainbowTitle.start();
  await fetchTemplate();
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

export const setCustomHelpText = () => gradient.pastel("Juice Scaffold");
// figlet("Juice Scaffold", (_, data) => {
//   console.log(`${gradient.pastel(data)}\n`);
// });
