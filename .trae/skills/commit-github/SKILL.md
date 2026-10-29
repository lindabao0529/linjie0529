---
name: commit-github
description: 将整个项目 git commit 并推送到 GitHub 远程 ssh://git@ssh.github.com:443/lindabao0529/linjie0529.git，使用本机已配置的 SSH 公钥认证。当用户说 提交到github、提交到GitHub、push到GitHub 或要求把本项目提交到 GitHub 时触发。不用于推送 Gitee（用 commit-project），不用于无关的单次文件修改。
---

# 提交到 GitHub

把当前项目提交并推送到 GitHub 仓库。使用 SSH 公钥认证，全程不涉及令牌，禁止把任何凭据写入被跟踪的文件。

## 网络前提（重要）

本机网络环境**拦截了 22 端口**，直连 github.com:22 会被拒绝（已实测）。因此：

- 远程地址统一使用 GitHub 官方的 **SSH over 443** 通道：`ssh://git@ssh.github.com:443/lindabao0529/linjie0529.git`
- 公钥认证已验证可用（2026-10-29 实测返回 "Hi lindabao0529!"），ssh.github.com 主机密钥已加入 known_hosts
- 若日后用户自行在 `~/.ssh/config` 配置了 github.com 走 443，可改用短格式 `git@github.com:lindabao0529/linjie0529.git`，两者等价

## 固定参数

- 仓库根目录：d:\GJWLSJ\529linjie
- 远程名称：github（与 Gitee 的 origin 共存，互不影响）
- 远程地址：ssh://git@ssh.github.com:443/lindabao0529/linjie0529.git
- 分支：main
- 网页地址：https://github.com/lindabao0529/linjie0529

## 执行步骤

### 0. 前置（项目规则，必须最先执行）

- 把本次提示词按固定格式（时间、使用模型、提示词内容）**追加**到 linjie_prompt.md，不覆盖已有记录。

### 1. 环境检查

1. `git status` 确认当前在仓库根目录且是 git 仓库；若未初始化，执行 `git init -b main`
2. `git remote -v` 检查远程：
   - 没有 `github` 远程 → `git remote add github ssh://git@ssh.github.com:443/lindabao0529/linjie0529.git`
   - `github` 远程地址不一致 → `git remote set-url github ssh://git@ssh.github.com:443/lindabao0529/linjie0529.git`
3. SSH 连通性测试：`ssh -o ConnectTimeout=10 -T -p 443 git@ssh.github.com`
   - 输出 "Hi xxx!" 即认证成功（GitHub 不提供 shell，退出码为 1 属正常现象）
   - 认证失败：提示用户检查本机 `~/.ssh` 的公钥是否已添加到 GitHub 账户（Settings → SSH and GPG keys），停止执行；**不要**改用 HTTPS+账号密码或令牌方式兜底，也**不要**修改用户全局 `~/.ssh/config`

### 2. 提交

1. `git status --short` 与 `git diff --stat` 查看变更；没有任何变更时告知用户并结束，不产生空提交
2. 敏感文件检查：确认不包含令牌、密钥、.env、内部凭据等；`.trae/skills/commit-project/token.txt` 必须保持被 .gitignore 排除，若 git status 中出现它，立即停止并修复 .gitignore
3. 显式 `git add <文件>` 暂存相关文件（避免无差别的 `git add -A` 误加敏感文件）
4. 提交信息用中文，格式 `类型: 说明`（feat / fix / docs / refactor / chore），说明"为什么"而非罗列文件
5. PowerShell 环境直接 `git commit -m "提交信息"`；不要使用 bash 的 HEREDOC 语法

### 3. 推送

- 首次推送：`git push -u github main`
- 日常推送：`git push github main`
- 推送被拒（远程有新提交）时：先 `git fetch github`，再 `git pull github main --rebase`，解决冲突前需向用户确认；完成后重新推送
- 禁止 `--force` 强推、禁止 `--no-verify` 跳过钩子

### 4. 收尾

- `git status` 确认工作区干净、分支已跟踪 `github/main`
- 向用户报告：提交哈希、推送结果、仓库网页地址
