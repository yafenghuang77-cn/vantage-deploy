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
- 支持 Less 变量、嵌套、mixin 和相对路径导入。`webpackImporter: true` 保留构建工具的导入解析；已验证相对路径和 `@/` 别名导入，例如 `@import (reference) '@/styles/variables.less';`（目标文件需自行创建）。
- Ant Design 主题通过 `ConfigProvider` 的 `theme` Token 配置；业务 Less 样式与组件库主题分别维护。
- Tailwind 工具类可直接写入 JSX，例如根布局的 `antialiased`；当前首页的组件样式使用 Less Modules。Tailwind 指令保留在 CSS 文件中，Less 文件处理自身的变量、嵌套和 mixin。

Stylelint 对 CSS 使用 `stylelint-config-standard`，保留 Tailwind 指令的 `at-rule-no-unknown` 白名单；对 Less 使用 `stylelint-config-standard-less`（包含 `postcss-less` 解析器和 Less 专用规则）。`pnpm lint:style`、提交时的 lint-staged 和编辑器保存检查均覆盖 `.css` 与 `.less`；Prettier 原生支持 Less。Less Modules 的 TypeScript 声明位于 `src/types/styles.d.ts`。

## 测试

测试规范沿用 Umi 项目的组织方式：Jest 和 React Testing Library 负责单元与组件测试，Playwright 负责真实浏览器中的页面流程。框架适配使用 `next/jest`，不使用 Umi 的转换器或运行时。

| 命令                    | 用途                                                       |
| ----------------------- | ---------------------------------------------------------- |
| `pnpm test`             | 运行全部单元与组件测试                                     |
| `pnpm test:watch`       | 监听文件变化，运行相关单元测试                             |
| `pnpm test:coverage`    | 运行单元测试并输出覆盖率报告                               |
| `pnpm test:e2e:install` | 手动安装 Chromium 浏览器，首次运行或 Playwright 升级后使用 |
| `pnpm test:e2e`         | 构建应用，启动独立生产服务并运行 Chromium 测试             |
| `pnpm test:e2e:headed`  | 显示浏览器执行 E2E 测试                                    |
| `pnpm test:e2e:ui`      | 打开 Playwright 交互界面                                   |
| `pnpm test:e2e:report`  | 查看最近一次 E2E 的 HTML 报告                              |
| `pnpm test:ci`          | 依次执行静态检查、单元测试及覆盖率、构建及 E2E             |

```text
jest.config.mjs          # Next.js 的 Jest 配置
playwright.config.ts    # 浏览器、服务启动和失败报告配置
tests/
  setup.ts              # DOM 断言、matchMedia 模拟及存储清理
  mocks/style.cjs       # 全局 Less 的空样式模拟
  unit/*.test.ts(x)     # Jest 用例
  e2e/*.spec.ts         # Playwright 用例
```

### 单元与组件测试

用例统一放在 `tests/unit/`，使用 `*.test.ts` 或 `*.test.tsx`，Jest 不扫描 E2E 目录。测试可以使用 `@/` 别名；`next/jest` 处理 TypeScript、JSX、Next.js 静态资源等，额外配置将 Less Modules 映射为类名代理，将全局 Less 映射为空对象。Jest 不执行真实样式编译，样式编译由生产构建覆盖。ESLint 的 Jest 规则只作用于初始化文件及单元测试目录。

组件测试使用 `getByRole`、`getByLabelText` 等方式定位用户可见元素，有交互时使用 `@testing-library/user-event`。每条测试后自动清理 DOM、本地存储和会话存储；Jest 自动清空 mock 调用记录，并恢复 spy。当前首页冒烟测试验证欢迎标题与按钮渲染。

覆盖率输出到 `coverage/`，包含终端摘要、HTML 和 LCOV，统计 `src` 中的 TS/TSX，排除类型声明。当前阶段先观察覆盖率，不设置全局强制门槛；后续按核心业务模块设置要求。异步 Server Component 的页面行为使用 E2E 验证，可独立的业务逻辑拆成函数后单测。

MSW 依赖已保留，当前没有接口用例，暂不启动模拟服务。引入接口集成测试时再配置 handlers、未声明请求报错和每条用例后的 handlers 重置。浏览器请求拦截不能代替 Next.js 服务端请求的模拟。

### 浏览器测试

用例放在 `tests/e2e/`，使用 `*.spec.ts`，通过 `@playwright/test` 导入 `test` 和 `expect`。默认构建并在 `127.0.0.1:18101` 启动生产服务，等待就绪后执行测试，结束时关闭服务；不会复用占用该端口的已有服务。当前首页用例验证页面标题、内容及刷新后的展示。

修改测试端口，或测试已有服务：

```bash
PLAYWRIGHT_PORT=18102 pnpm test:e2e
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 pnpm test:e2e
```

设置 `PLAYWRIGHT_BASE_URL` 后跳过构建和服务启动，测试结束也不会关闭该外部服务。测试已有服务时应使用独立测试环境，避免后续业务用例影响真实数据。

报告输出到 `playwright-report/`，失败截图、视频及 Trace 输出到 `test-results/`，覆盖率和浏览器报告均已加入 Git、ESLint 与 Prettier 忽略范围。CI 设置 `CI=true` 后禁止 `test.only`，使用单 worker，失败最多重试两次。Linux CI 首次准备浏览器可手动执行 `pnpm exec playwright install --with-deps chromium`，再运行 `pnpm test:ci`；CI 应保存上述报告目录以便排查失败。

`pnpm check` 和提交钩子保持静态检查职责，测试通过单独命令运行；`pnpm test:ci` 提供完整验证入口。
