# VST

English / [简体中文](./README.zh-CN.md)

VST (Vue Starter Template) is an opinionated `Vue 3/Vite/TypeScript/Naive UI/Tailwind CSS` starter template.

## Feature

- [x] Based on [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/), [pnpm](https://pnpm.io/)
- [x] [TypeScript](https://www.typescriptlang.org/), of course
- [x] [Naive UI](https://www.naiveui.com/) as UI framework
- [x] [Tailwind CSS](https://tailwindcss.com/) for rapid development based on atomic CSS
- [x] [Sass](https://sass-lang.com/) for CSS pre-processing
- [x] [Vue Router](https://router.vuejs.org/) for routing management
- [x] [Pinia](https://pinia.esm.dev/) for global state management
- [x] [Axios](https://axios-http.com/) for request management
- [x] [iconify/json] and [unplugin-icons] for icon management, can use icones quickly
- [x] [unplugin-auto-import] and [unplugin-vue-components] for automatic import, free your hands
- [x] [ESLint](https://eslint.org/) for code checking
- [x] [Prettier](https://prettier.io/) for code formatting
- [x] [cspell] for code spell checking
- [x] [Husky](https://typicode.github.io/husky/#/) and [lint-staged] and [commitlint] for Git commit management
- [ ] [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for containerization
- [x] Use `@/*` as absolute path
- [x] Deploy on Vercel, zero config

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Naive UI](https://www.naiveui.com/)
- [Sass](https://sass-lang.com/)

## Code Style

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Getting Started

### GitHub Template

> VST requires Node version >=14.16.0

[Create a repo using this template](https://github.com/recallwei/vst/generate).

### Clone to local

If you prefer to do it manually with a cleaner Git history then follow these steps:

```bash
npx degit recallwei/vst my-vst-app
cd my-vst-app
pnpm i
```

## Checklist

When using this template, try to update your own information correctly according to the checklist:

- [ ] Clean up `README.md`
- [ ] Change author name in `LICENSE`
- [ ] Change project name, description, author, etc. in `package.json`
- [ ] Modify environment variables in `.env` and delete the file `.env.example` which is an example of environment variables
- [ ] Modify the site meta data in `index.html`
- [ ] Change `favicon.ico` in the `/public` directory
- [ ] Change the interface proxy in `vite.config.ts`
- [ ] Change the site meta data in `src/app.config.ts`
- [ ] Delete the example API in the `src/api` directory
- [ ] Delete the example images in the `src/assets/images` directory
- [ ] Delete the example route in the `src/router` directory
- [ ] Delete the example view in the `src/views` directory
- [ ] Delete the example store in the `src/store` directory

## Notice

- xxx

## Usage

### Environment

- Node.js >=16.14.0
- pnpm

### Config Environment Variables

Config `.env` file, refer to [.env.example](./.env.example).

### Install

```bash
pnpm i
```

### Start

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Known Issue

- [ ] xxx

## License

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei)
