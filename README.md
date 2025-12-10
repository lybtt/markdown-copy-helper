# Markdown Copy Helper

一个 Obsidian 插件，帮助复制 Markdown 内容，支持：

1. 复制 Markdown 正文内容（自动忽略 YAML 前置内容）
2. 复制 Markdown 正文内容并将本地图片转换为 base64 格式（自动忽略 YAML 前置内容）

## 功能特点

- 自动忽略 YAML 前置内容
- 支持将本地图片转换为 base64 格式
- 保留网络图片链接不变
- 保留图片的 alt 文本和标题
- 支持多种图片格式（jpg, png, gif, webp, svg, bmp）
- **自动识别 Obsidian 配置的附件文件夹路径**
- **支持附件路径变量（如 ${filename}、${folder}）**
- **支持两种图片语法格式**：
  - 标准 Markdown：`![alt](path)`
  - Obsidian Wikilink：`![[image]]`、`![[image|alt]]`、`![[image|alt|width=100]]`
- **智能路径解析，按以下顺序查找图片**：
  1. Obsidian 配置的附件文件夹
  2. 相对于当前文件的路径
  3. 仓库根目录

## 🌍 Language

- [中文文档](README.md)
- [English Documentation](README_EN.md)

## 使用方法

### 方法一：使用 Ribbon 按钮
在 Obsidian 左侧工具栏中，点击以下按钮：
- 复制按钮：复制 Markdown 正文（忽略 YAML）
- 图片按钮：复制 Markdown 正文并转换图片为 base64（忽略 YAML）

### 方法二：使用命令面板
1. 打开命令面板（Cmd/Ctrl + P）
2. 搜索并选择以下命令之一：
   - "复制 Markdown 正文（忽略 YAML）"
   - "复制 Markdown 正文并转图片为 base64（忽略 YAML）"

### 方法三：使用编辑器右键菜单
在编辑器中右键，选择相应的复制选项。

## 安装方法

1. 将插件文件复制到 Obsidian 的插件目录
2. 在 Obsidian 设置中启用该插件

## 示例

假设你有以下 Markdown 文件（文件名：`我的笔记.md`）：

```markdown
---
title: 我的文档
date: 2023-12-11
tags: [test, demo]
---

# 主标题

这是一些正文内容。

![本地图片](images/local.png "本地图片标题")

![[Pasted image 20231211000001.png]]

![[my-image.png|图片描述]]

![[diagram.png|图表|width=400]]

![使用变量的图片](${filename}_image.png)

![网络图片](https://example.com/image.jpg)
```

如果你的 Obsidian 设置中附件文件夹路径为 `attachments`，插件会按以下顺序查找图片：

1. **Pasted image 20231211000001.png** → 在 `attachments/` 文件夹中查找
2. **my-image.png** → 在 `attachments/` 文件夹中查找，并保留 alt text "图片描述"
3. **diagram.png** → 在 `attachments/` 文件夹中查找，并保留 alt text "图表"（忽略 width 参数）
4. **${filename}_image.png** → 替换为 `我的笔记_image.png`，然后在附件文件夹中查找
5. **images/local.png** → 在当前文件所在目录的 `images/` 子目录中查找
6. 如果都找不到，则保留原始路径

使用"复制正文"功能后，剪贴板内容为：

```markdown
# 主标题

这是一些正文内容。

![本地图片](images/local.png "本地图片标题")

![[Pasted image 20231211000001.png]]

![[my-image.png|图片描述]]

![[diagram.png|图表|width=400]]

![使用变量的图片](${filename}_image.png)

![网络图片](https://example.com/image.jpg)
```

使用"复制正文并转图片为 base64"功能后，剪贴板内容为：

```markdown
# 主标题

这是一些正文内容。

![本地图片](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA... "本地图片标题")

![Pasted image 20231211000001.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...)

![图片描述](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...)

![图表](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...)

![使用变量的图片](${filename}_image.png)

![网络图片](https://example.com/image.jpg)
```

注意：Wikilink 格式的图片会自动转换为标准 Markdown 格式，同时保留 alt 文本。

## 开发

```bash
# 安装依赖
npm install

# 构建插件
npm run build

# 开发模式
npm run dev
```