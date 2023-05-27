import chalk from "chalk";
import consola from "consola";

export const showErrorMessage = (message: string) => {
  consola.error(chalk.red(message));
};

export const showSuccessMessage = (message: string) => {
  consola.log(chalk.green(message));
};

export const showWarningMessage = (message: string) => {
  consola.warn(chalk.yellow(message));
};
