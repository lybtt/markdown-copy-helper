# Markdown Copy Helper - Plugin Description

## English Description

### Short Description (用于列表展示)
A powerful plugin to copy markdown content with intelligent image handling.

### Full Description (用于插件详情页)

Markdown Copy Helper is a versatile Obsidian plugin designed to streamline your markdown content copying workflow. Whether you're sharing notes, creating documentation, or preparing content for other platforms, this plugin ensures your content is clean, portable, and self-contained.

## Key Features

### 📝 Smart Content Copying
- **YAML Exclusion**: Automatically removes YAML front matter to keep your copied content clean
- **Pure Content**: Copies only the essential markdown content, perfect for sharing
- **Quick Access**: Multiple ways to trigger copy actions for maximum efficiency

### 🖼️ Advanced Image Handling
- **Base64 Conversion**: Converts local images to base64 format for self-contained content
- **Multiple Formats**: Supports both standard markdown `![alt](path)` and Obsidian wikilink `![[image]]` syntax
- **Smart Path Resolution**: Automatically finds images in your configured attachment folders

### 🔧 Intelligent Path Detection
- **Automatic Detection**: Reads your Obsidian attachment folder settings
- **Relative Path Support**: Handles relative paths like `./attachments/` correctly
- **Path Variables**: Supports variables like `${filename}` and `${folder}`
- **Fallback Strategy**: Searches multiple locations if the primary path fails

### 🌍 International Support
- **Multi-language**: Full UI translation support for English, Chinese (Simplified/Traditional), and Japanese
- **Auto Detection**: Automatically detects your system language

## How to Use

1. **Ribbon Icons**: Click the copy or copy-with-images icons in the sidebar
2. **Command Palette**: Use Cmd/Ctrl+P and search for "Copy Markdown Content"
3. **Context Menu**: Right-click in the editor for quick access options

## Perfect for
- Creating documentation that needs to be portable
- Sharing notes with images without broken links
- Preparing content for platforms that don't support Obsidian's wikilinks
- Exporting clean markdown without metadata

## Privacy
This plugin works entirely locally. No data is sent to external servers.

---

# 中文描述

### 简短描述（用于列表展示）
强大的 Markdown 内容复制工具，智能处理图片链接。

### 完整描述（用于插件详情页）

Markdown Copy Helper 是一款功能丰富的 Obsidian 插件，旨在简化您的 Markdown 内容复制工作流程。无论您是分享笔记、创建文档，还是准备内容用于其他平台，这款插件都能确保您的内容干净、便携且自包含。

## 核心功能

### 📝 智能内容复制
- **YAML 前置内容排除**：自动移除 YAML 前置内容，保持复制内容的整洁
- **纯内容复制**：仅复制必要的 Markdown 内容，非常适合分享
- **快速访问**：提供多种触发复制操作的方式，提高效率

### 🖼️ 高级图片处理
- **Base64 转换**：将本地图片转换为 base64 格式，实现内容自包含
- **多格式支持**：同时支持标准 Markdown 语法 `![alt](path)` 和 Obsidian Wikilink 语法 `![[图片]]`
- **智能路径解析**：自动在您配置的附件文件夹中查找图片

### 🔧 智能路径检测
- **自动检测**：读取您的 Obsidian 附件文件夹设置
- **相对路径支持**：正确处理 `./attachments/` 等相对路径
- **路径变量**：支持 `${filename}` 和 `${folder}` 等变量
- **回退策略**：主路径失败时自动搜索其他位置

### 🌍 国际化支持
- **多语言**：完整支持英语、中文（简体/繁体）和日语
- **自动检测**：自动检测系统语言

## 使用方法

1. **侧边栏图标**：点击侧边栏的复制或复制并转图片按钮
2. **命令面板**：使用 Cmd/Ctrl+P 搜索"复制 Markdown 内容"
3. **右键菜单**：在编辑器中右键快速访问选项

## 适用场景
- 创建需要便携的文档
- 分享包含图片且不会断链的笔记
- 为不支持 Obsidian Wikilinks 的平台准备内容
- 导出不包含元数据的纯净 Markdown

## 隐私保护
此插件完全在本地运行，不会将任何数据发送到外部服务器。

## Tags/Keywords
markdown, copy, export, image, base64, wikilink, productivity, utility, documentation, sharing, portable, clean content