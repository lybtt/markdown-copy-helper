# 发布到 Obsidian 社区插件商店指南

## 1. 准备工作

### 1.1 确保插件符合要求
- ✅ 插件有唯一的 ID (markdown-copy-helper)
- ✅ 版本号遵循语义化版本 (1.0.0)
- ✅ 插件有清晰的描述
- ✅ 包含 LICENSE 文件
- ✅ 插件没有安全漏洞

### 1.2 GitHub 仓库准备
1. 在 GitHub 创建公开仓库
2. 推送代码到 GitHub
3. 创建第一个 release

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/lybtt/obsidian-markdown-copy-helper.git
git branch -M main
git push -u origin main

# 创建并推送第一个 release
git tag v1.0.0
git push origin v1.0.0
```

## 2. 提交到 Obsidian 社区

### 2.1 访问插件提交页面
前往: https://obsidian.md/publish

### 2.2 填写插件信息
- **Plugin ID**: `markdown-copy-helper`
- **Plugin Version**: `1.0.0`
- **GitHub Repository**: `https://github.com/lybtt/obsidian-markdown-copy-helper`
- **Download URL**: `https://github.com/lybtt/obsidian-markdown-copy-helper/releases/download/v1.0.0/markdown-copy-helper-1.0.0.zip`
  - 注意：首次提交后，Obsidian 会自动生成下载链接

### 2.3 插件描述（英文）
```
A simple Obsidian plugin to copy markdown content.

Features:
- Copy markdown content without YAML front matter
- Convert local images to base64 format
- Support both standard markdown ![alt](path) and Obsidian wikilink ![[image]] syntax
- Automatically detects and uses Obsidian's attachment folder settings
- Support for relative paths and path variables (${filename}, ${folder})
- Multi-language support (English, Simplified Chinese, Traditional Chinese, Japanese)

Usage:
1. Click the copy button in the ribbon to copy markdown content
2. Click the copy-with-images button to copy and convert images to base64
3. Use command palette (Cmd/Ctrl+P) to access copy commands
4. Right-click in editor for context menu options
```

### 2.4 插件描述（中文）
```
一个简单的 Obsidian 插件，用于复制 Markdown 内容。

功能：
- 复制 Markdown 正文内容，自动忽略 YAML 前置内容
- 将本地图片转换为 base64 格式
- 支持标准 Markdown 语法 ![alt](path) 和 Obsidian Wikilink 语法 ![[图片]]
- 自动检测并使用 Obsidian 的附件文件夹设置
- 支持相对路径和路径变量（${filename}、${folder}）
- 多语言支持（英语、简体中文、繁体中文、日语）

使用方法：
1. 点击工具栏的复制按钮复制 Markdown 内容
2. 点击复制并转图片按钮，将图片转换为 base64
3. 使用命令面板（Cmd/Ctrl+P）访问复制命令
4. 右键编辑器访问上下文菜单
```

## 3. 审核流程

### 3.1 提交后
- Obsidian 团队会在 1-2 周内审核
- 审核通过后，插件会出现在社区插件列表
- 审核失败会收到邮件通知

### 3.2 常见拒绝原因
- 插件与现有插件功能重复
- 插件有 bug 或安全问题
- 插件违反社区准则
- 描述不准确

## 4. 发布新版本

### 4.1 更新版本号
```bash
# 更新 package.json 中的版本号
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 4.2 更新 manifest.json
手动更新 manifest.json 中的版本号，确保与 package.json 一致

### 4.3 创建新 Release
```bash
git tag v1.0.1
git push origin v1.0.1
```

### 4.4 通知 Obsidian
在插件管理页面点击 "Update Plugin"，Obsidian 会自动检测新版本

## 5. 注意事项

- 插件 ID 一旦确定不能更改
- 版本号必须递增
- 每个版本必须有对应的 GitHub Release
- Release 必须包含 manifest.json 和 main.js
- 保持仓库公开，否则 Obsidian 无法访问

## 6. 维护

- 定期检查插件是否兼容新版 Obsidian
- 修复用户报告的 bug
- 根据反馈添加新功能
- 及时更新文档