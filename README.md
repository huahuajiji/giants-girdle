# Giant's Girdle

WebGIS 个人项目集，基于 [HTML5 UP 的 Forty 模板](https://html5up.net/forty) 改造，迁移到 Vue 3 + Vite。

## 技术栈

- Vue 3（`<script setup>`）
- Vue Router 4（hash 模式，兼容 GitHub Pages）
- Vite 8
- 原生 CSS（无 Sass、无 jQuery）

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

部署地址为 `https://<用户名>.github.io/giants-girdle/`，`vite.config.js` 里的 `base` 与之对应。推送到 `main` 分支会触发 `.github/workflows/deploy.yml` 自动部署到 GitHub Pages。

## 目录

```
src/
  components/   顶部栏、菜单、横幅、转盘、页脚
  data/         项目数据（增删项目只改 projects.js）
  router/       路由与滚动行为
  views/        首页、项目页、简历、关于、联系方式
  assets/       全局样式（main.css 为模版原样引入）、图标字体
  images/       图片资源
```

## 许可

原模板 Forty 由 [HTML5 UP](https://html5up.net) 发布，采用 [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) 许可，署名保留在页脚，详见 `LICENSE.txt`。
