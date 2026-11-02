# AGENTS.md

「高级网页设计」课程的静态 HTML/CSS/JS 作业项目。无构建系统、无 package.json、无测试、无代码检查工具。页面直接在浏览器中打开验证。

## 硬性规则（来自 `linjie_prompt.md` —— 用户的长期指令）

- **文档语言**：本项目所有文档、说明、检查清单统一使用简体中文；文件路径、HTML/CSS/JS 标识符保留英文。
- **命名**：所有新建的 CSS 类、CSS id、CSS 自定义属性、JS 变量必须以 `linjie_` 开头（如 `.linjie_nav`、`--linjie_ink`、`linjie_rise`）。适用于所有新代码；除非用户要求，不要重命名已有的无关文件。
- **代码注释**：每个新建 `.html` 文件必须在 `<head>` 之后（或文件顶部）携带文件头注释（`<!-- -->`），包含四项：林洁（作者）、建立时间、使用模型、功能名称及简介。每个 `<script>` 中的函数前必须有说明函数名与主要功能的注释，例如 `/* linjie_calcTotal —— 功能：计算单个学生总分（reduce 累加） */`。注释一律用中文。
- **首页链接**：任何新建 `.html` 页面必须能从 `index.html`（目录/首页）访问到，添加到对应分区并附描述性链接文字。
- **提示词记录**：执行用户提示词之前，先向 `linjie_prompt.md` 追加一条记录（只追加，绝不覆盖）：时间、模型名、提示词全文，沿用文件中已有的记录格式。记录中的敏感信息（如令牌）需脱敏。
- 界面文案与代码注释使用中文（`lang="zh-CN"`）。

## 目录结构

- `index.html` —— 首页/目录，所有练习页面都从这里链接出去。
- 根目录 `*.html` / `*.css` —— 独立练习页面；多数自包含，部分与同名 `.css` 或 `data.js` 配套。
- `cdn/` —— 本地化的第三方资源（Font Awesome、Lucide）。引用本地副本（如 `cdn/fontawesome/css/all.min.css`），不要外链 CDN。
- `font/` —— 本地 iconfont 字体图标（`iconfont.css`、`iconfont.json`、webfonts）。
- `img/` —— 图片素材。
- `linjie_prompt.md` —— 只追加的提示词历史（见上方规则）。
- `data.js` —— 学生成绩面板练习的共享模拟数据；由 starter/target 页面通过 `<script src>` 引入。

## Git / 推送到 Gitee

- 远程：`https://gitee.com/lin-jie0529/linjie529.git`，分支 `main`。单人课程作业；提交信息用中文单行 `类型: 说明`（如 `feat: ...`、`docs: ...`）。
- 提交并推送请遵循 `.trae/skills/commit-project/SKILL.md`（「提交项目」技能）：PowerShell 5（多条命令用 `;`，不用 `&&`），在仓库根目录运行 git，禁止 `--force`/`--no-verify`。
- Gitee 令牌仅存放于 `.trae/skills/commit-project/token.txt`（已被 .gitignore 排除）。绝不要把令牌写入任何被跟踪的文件（`linjie_prompt.md`、HTML、SKILL.md 等）。
- 另有 OpenCode 用户级技能 `gitee-commit-push`（`~/.opencode/skills/`）可用。

## 推送到 GitHub

- 远程：`github` → `ssh://git@ssh.github.com:443/lindabao0529/linjie0529.git`（本机网络拦截 22 端口，走官方 443 通道，SSH 公钥认证）。
- 提交并推送请遵循 `.trae/skills/commit-github/SKILL.md`（「提交到github」技能）。

## 设计技能

`skills/frontend-design/SKILL.md` —— 新页面视觉设计质量指南（有个性的布局/排版，避免 AI 模板化默认样式）。创建或重设计页面视觉时加载它。
