# create-juice-app
> 一个有趣的前端脚手架

`Create-juice-app`可以在`macOS`、`Linux`、`Windows`上运行，如果你在使用的时候遇到了任何问题，欢迎给我们提`issue`，如果你想要提问，也可以联系我们或者在`Github Discussions`上留言。

###  快速开始

```bash
npx create-juice-app my-app
cd my-app
npm start
```

如果你在通过`npm i -g create-juice-app`命令在全局安装了`create-juice-app`，我们推荐你使用`npm uninstall -g create-juice-app`卸载掉全局命令，使用`npx`可以确保使用的命令处于最新的版本。

你可以快速创建一个前端项目（这里我已经在本地全局安装了这个命令，如果你不想全局安装，则在命令前加上`npx`即可）：

![](./img/1.gif)



### 模板

脚手架的原理是根据用户交互的信息，去拉取目标模板类型的样板项目代码进行初始化，我们会初始化一些通用的内容。诸如：

- 项目描述
- 开发者
- 开发端口配置
- 后端地址环境变量
- 包管理工具
  - npm
  - yarn
  - pnpm

目前支持的模板如下：

> 每一个脚手架我们都配置好一个基础的代码规范管理、格式化、插件设置、git 规范等功能

- [Juice](https://github.com/Developer27149/create-juice-app/blob/juice/README.md): `Vue3`生态下的服务端渲染解决方案，基于`TypeScript`+[Nuxt3](https://nuxt.com/)技术栈
  - 状态管理使用的是[Pinia | The intuitive store for Vue.js](https://pinia.vuejs.org/)
  - API数据管理使用的是[Vue-query](https://tanstack.com/query/v4/docs/vue/overview)
  - 样式则使用`sass`和[Tailwind CSS](https://tailwindcss.com/)
  - 使用`nuxt-icon`方便创建 `svg icon`
  - `eslint+prettier+commitlint+husky`
  - Test

- React: 暂未完成



### 参与开发

非常期待大家参与构建模板系统，你只需要创建一个新的分支即可。分支名就是你的模板名称。

或许你也需要稍微阅读一下脚手架的源代码（如果有任何建议、欢迎留言）



### License

本项目使用`MIT`许可证
