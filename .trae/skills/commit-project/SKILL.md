---
name: commit-project
description: Commit the whole project with git and push it to the Gitee remote https://gitee.com/lin-jie0529/linjie529.git. Use when the user says 提交项目, commit project, push project, or asks to submit this coursework to Gitee. Do not use for unrelated one-off file edits.
---

# 提交项目（Commit & Push to Gitee）

把当前课程项目提交并推送到 `https://gitee.com/lin-jie0529/linjie529.git`。仓库根目录固定为 `d:\GJWLSJ\529linjie`。

## 环境注意

- 终端是 Windows PowerShell 5：多条命令用 `;` 连接，**不要用 `&&`**。
- 所有 git 命令在仓库根目录执行，git 命令前不要拼接 `cd`。

## 认证（Gitee 私人令牌）

- 完整令牌只存放在 `.trae/skills/commit-project/token.txt`（已被 `.gitignore` 排除，不进入版本库）。
- **禁止**把令牌写入任何被 git 跟踪的文件（SKILL.md、linjie_prompt.md、网页源码等）。
- 推送时若要求认证，或远程未带令牌，用令牌构造带凭证的远程地址：
  1. 读取令牌：`$linjie_token = (Get-Content .trae/skills/commit-project/token.txt -Raw).Trim()`
  2. 设置远程：`git remote set-url origin ("https://lin-jie0529:" + $linjie_token + "@gitee.com/lin-jie0529/linjie529.git")`
  3. 之后正常 `git push`。`.git/config` 属本地文件，不会被提交。
- 若 `git push` 无需认证（凭证管理器已缓存），直接推送即可，不必重设远程。

## 步骤

1. **确认仓库状态**：运行 `git rev-parse --is-inside-work-tree`。
   - 若失败（还不是 git 仓库，项目首次创建于 2026-10-22 时无 git 历史）：
     - `git init -b main`（若旧版 git 不支持 `-b`，用 `git init` 后 `git branch -M main`）
     - `git remote add origin https://gitee.com/lin-jie0529/linjie529.git`
2. **远程校验**：`git remote -v` 确认 origin 指向上述地址；不对则 `git remote set-url origin https://gitee.com/lin-jie0529/linjie529.git`。
3. **了解变更**：并行运行 `git status`、`git diff`、`git log --oneline -5`（无历史时跳过 log），据此起草提交信息。
4. **暂存**：优先按文件名显式 `git add <file>...`；文件很多时可用 `git add -A`，但先确认没有 `.env`、凭据等敏感文件。本项目是纯静态网页课程作业，通常无密钥风险。
5. **提交**：`git commit -m "<中文一句话，说清为什么>"`。多段信息用多个 `-m` 参数，不要用 heredoc。风格参考已有提交（首次提交可用 `init: 高级网页设计课程项目初始化` 这类格式：`类型: 说明`）。
6. **推送**：
   - 首次推送：`git push -u origin main`
   - 日常推送：`git push`
   - 推送后运行 `git status` 确认工作区干净。
7. **失败处理**：推送被拒（非快进）时先 `git pull --rebase origin main` 再推送；**禁止 `--force` / `--no-verify`**。若远程要求认证，提示用户在弹窗或终端中输入 Gitee 账号凭证。

## 禁止

- 强推、跳过钩子、修改 git config。
- 在未获用户明确要求时提交无关文件或创建空提交。
