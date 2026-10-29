# AGENTS.md

Static HTML/CSS/JS coursework for a Chinese "高级网页设计" (Advanced Web Design) class. No build system, no package.json, no tests, no linter. Pages are opened directly in a browser; verify by opening the file.

## Hard rules (from `linjie_prompt.md` — the user's standing instructions)

- **Naming**: every new CSS class, CSS id, CSS custom property, and JS variable must start with `linjie_` (e.g. `.linjie_nav`, `--linjie_ink`, `linjie_rise`). Applies to all new code; do not rename existing unrelated files unless asked.
- **Homepage link**: any new `.html` page must be linked from `index.html` (the catalog/homepage). Add it to the relevant section with a descriptive link.
- **Prompt log**: before executing a user prompt, append an entry to `linjie_prompt.md` (append-only, never overwrite): time, model name, and the full prompt text, using the same record format already in the file. Redact secrets (e.g. tokens) in the logged prompt text.
- UI text and comments are in Chinese (`lang="zh-CN"`).

## Layout

- `index.html` — homepage/catalog; every practice page is linked from here.
- `*.html` / `*.css` at root — standalone practice pages; many are self-contained, some pair with a same-stem `.css` or `data.js`.
- `cdn/` — locally vendored third-party assets (Font Awesome, Lucide). Reference local copies (`cdn/fontawesome/css/all.min.css`), do not hotlink CDNs.
- `font/` — local iconfont (`iconfont.css`, `iconfont.json`, webfonts).
- `img/`, `img/` assets as needed.
- `linjie_prompt.md` — append-only prompt history (see rule above).
- `data.js` — shared sample data for the student-score panel exercise; loaded by starter/target pages via `<script src>`.

## Git / push to Gitee

- Remote: `https://gitee.com/lin-jie0529/linjie529.git`, branch `main`. Single-person coursework; commit style: Chinese one-liner `类型: 说明` (e.g. `feat: ...`, `docs: ...`).
- To commit+push, follow `.trae/skills/commit-project/SKILL.md` (the `提交项目` skill): PowerShell 5 (use `;`, not `&&`), run git from repo root, no `--force`/`--no-verify`.
- Gitee token lives only in `.trae/skills/commit-project/token.txt` (gitignored). Never write the token into any tracked file (`linjie_prompt.md`, HTML, SKILL.md, etc.).
- Also available as an OpenCode skill: `gitee-commit-push` (user-level, `~/.opencode/skills/`).

## Design skill

`skills/frontend-design/SKILL.md` — design-quality guidance for new UI pages (distinctive layout/typography, avoid AI-template defaults). Load it when creating or redesigning a page's visual design.
