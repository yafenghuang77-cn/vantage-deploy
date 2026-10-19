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
