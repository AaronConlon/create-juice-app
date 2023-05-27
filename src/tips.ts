import chalk from "chalk";

export const showErrorMessage = (message: any, ...args: any) => {
  console.error(chalk.bgRed("错误提示"), ":", chalk.red(message), ...args);
};
