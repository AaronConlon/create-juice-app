# {{projectName}}

## 项目概述

{{description}}

官方文档 [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction)

## 初始化

确保你已经安装了依赖

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## 开发

运行一下命令即可在本地打开开发服务器

```bash
npm run dev
```



## 代码提交

在代码提交之前，我们会执行测试和`git commit`检查的钩子，只有通过了代码测试和`prettier`+`eslint`的检查和格式化才能提交代码。这样就能让代码在团队协作的时候保持较好的一致性。

这里介绍一下代码提交规范。

以下是提交的`commit`的格式：

```bash
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

只要按照这个格式来写`commit`信息，就很容易确保团队协作的提交信息格式一致，并且具有一定的可读性。举个例子：

```bash
# 运行测试
chore: run tests on travis ci
# 修复服务端跨域问题的 bug
fix(server): send cors headers
# 新增首页评论
feat(homepage): add comment section
```

如果你喜欢，还可以加上具有代表性的`emoji`图标，在这里找[gitmoji | An emoji guide for your commit messages  gitmoji.dev https://gitmoji.dev](https://gitmoji.dev/)



## 产品发布

执行构建命令即可构建项目：

```bash
npm run build
```

构建完成后支持本地预览：

```bash
npm run preview
```

## 项目依赖

本项目内置了一些好用的第三方库，非常推荐给大家使用：

- [Icon Module · Nuxt](https://nuxt.com/modules/icon)：可以去[Icônes](https://icones.js.org/)搜索你需要的图标
- [Tailwind UI - Official Tailwind CSS Components & Templates](https://tailwindui.com/)
- [Vue Query | TanStack Query Docs](https://tanstack.com/query/v4/docs/react/adapters/vue-query)
- [Pinia | The intuitive store for Vue.js](https://pinia.vuejs.org/)
- ...

待续
