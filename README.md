@latest

前端规范沿用 adminBase 项目，并保留 Next.js 的框架规则。

| 命令                | 用途                                             |
| ------------------- | ------------------------------------------------ |
| `pnpm check`        | 依次检查类型、ESLint、CSS 和格式                 |
| `pnpm lint`         | 检查 JS/TS、React 和 CSS，警告也视为失败         |
| `pnpm lint:fix`     | 自动修复 ESLint 和 Stylelint 可修复的问题        |
| `pnpm format`       | 使用 Prettier 统一格式                           |
| `pnpm format:check` | 只检查格式                                       |
| `pnpm typecheck`    | 生成 Next.js 路由类型并运行 TypeScript 类型检查  |
| `pnpm prepare`      | 安装当前仓库的 Git hooks，安装依赖时也会自动运行 |

编辑器建议安装 `.vscode/extensions.json` 中的扩展，保存时自动格式化并修复规范问题。代码使用两空格缩进、单引号、分号、LF 换行和 100 字符格式化宽度；导入按 React、第三方库、`@/` 别名、相对路径等分组排序。

未使用的变量和参数由 ESLint 严格检查（允许下划线前缀）；不在 TypeScript 全局开启对应检查，避免 Next.js 生成的路由校验文件触发误报。

提交代码前，Husky 会调用 lint-staged 检查并修复暂存文件。提交信息沿用原项目规则，例如 `feat: 新增部署列表`、`fix: 修复状态显示`；支持的类型与解析规则见 `commitlint.config.mjs`。

ESLint 与 `@eslint/js` 使用 9.x 的最新版本，TypeScript 使用 typescript-eslint 当前支持的 6.0.x 版本。直接安装标准 `typescript` 包，并限制在 6.0.x 范围内，避免升级到超出解析器兼容范围的版本。

## 样式开发

项目同时使用 Tailwind CSS 和 Less。Tailwind 沿用 Next.js 配置中的 `@tailwindcss/turbopack` CSS 规则；默认的 `pnpm dev` 和 `pnpm build` 也通过 Turbopack 调用 `less-loader`，再交给 Next.js 处理 CSS。全局 Less 输出为 CSS，`*.module.less` 单独输出为 CSS Modules，两套 Less 规则互斥。当前未配置 `--webpack` 模式。最新版 `less-loader` 要求 Node.js >= 22.11.0。

- Tailwind 入口和 `@theme` 配置写在 `src/app/globals.css`；全局基础样式写在 `src/app/globals.less`，两者均由根布局引入。
- 页面和组件样式使用 `*.module.less`，通过 `import styles from './page.module.less'` 和 `className={styles.page}` 使用，避免类名污染。
- 支持 Less 变量、嵌套、mixin 和相对路径导入。共享 Less 文件使用显式的相对路径；`webpackImporter: false` 使用 Less 自身的导入解析，不提供 webpack 别名解析。
- Ant Design 主题通过 `ConfigProvider` 的 `theme` Token 配置；业务 Less 样式与组件库主题分别维护。
- Tailwind 工具类可直接写入 JSX，例如根布局的 `antialiased`；当前首页的组件样式使用 Less Modules。Tailwind 指令保留在 CSS 文件中，Less 文件处理自身的变量、嵌套和 mixin。

Stylelint 对 CSS 使用 `stylelint-config-standard`，保留 Tailwind 指令的 `at-rule-no-unknown` 白名单；对 Less 使用 `stylelint-config-standard-less`（包含 `postcss-less` 解析器和 Less 专用规则）。`pnpm lint:style`、提交时的 lint-staged 和编辑器保存检查均覆盖 `.css` 与 `.less`；Prettier 原生支持 Less。Less Modules 的 TypeScript 声明位于 `src/types/styles.d.ts`。
