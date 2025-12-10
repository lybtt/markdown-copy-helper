# Markdown Copy Helper

[![Release](https://img.shields.io/github/release/lybtt/obsidian-markdown-copy-helper.svg)](https://github.com/lybtt/obsidian-markdown-copy-helper/releases)
[![License](https://img.shields.io/github/license/lybtt/obsidian-markdown-copy-helper.svg)](LICENSE)

An Obsidian plugin that helps you copy markdown content with automatic base64 image conversion.

## ✨ Features

- 📋 **Copy Markdown Content** - Copy only the content, automatically ignoring YAML front matter
- 🖼️ **Convert Images to Base64** - Transform local images into base64 format for self-contained markdown
- 🌐 **Wikilink Support** - Works with both `![alt](path)` and `![[image]]` syntax
- 📁 **Smart Path Resolution** - Automatically detects and uses your Obsidian attachment folder settings
- 🔧 **Path Variables** - Supports `${filename}` and `${folder}` variables in attachment paths
- 🌍 **Multi-language** - Supports English, Simplified Chinese, Traditional Chinese, and Japanese

## 🚀 Installation

### From Obsidian Community Plugins
1. Open Obsidian
2. Go to Settings → Community plugins
3. Search for "Markdown Copy Helper"
4. Click Install

### Manual Installation
1. Download the latest release from the [Releases page](https://github.com/lybtt/obsidian-markdown-copy-helper/releases)
2. Extract the zip file
3. Move the extracted folder to your Obsidian plugins directory
4. Enable the plugin in Obsidian settings

## 📖 Usage

### Ribbon Buttons
- 📋 **Copy Markdown Content** - Copy text without YAML
- 🖼️ **Copy with Base64 Images** - Copy text with images converted to base64

### Command Palette (Ctrl/Cmd + P)
- `Copy Markdown Content (Ignore YAML)` - Copy text without YAML
- `Copy Markdown Content with Images as Base64 (Ignore YAML)` - Copy text with base64 images

### Right-Click Menu
Right-click in the editor and select from the context menu.

## 🎯 How It Works

### Before
```markdown
---
title: My Note
date: 2024-01-01
---

# My Content

![[my-image.png]]

![local](images/pic.jpg)
```

### After Copy with Base64
```markdown
# My Content

![my-image.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...)

![local](data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...)
```

## ⚙️ Configuration

The plugin automatically uses your Obsidian attachment folder settings:

- Supports both absolute and relative paths
- Works with path variables:
  - `${filename}` - Replaced with current file name
  - `${folder}` - Replaced with current folder name
- Examples:
  - `./attachments` - Relative to current file
  - `attachments` - In vault root
  - `assets/${filename}` - In assets folder with file name

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/lybtt/obsidian-markdown-copy-helper.git

# Install dependencies
npm install

# Build the plugin
npm run build

# Watch for changes during development
npm run dev
```

## 📝 Changelog

### [1.0.0] - 2024-01-01
- Initial release
- Copy markdown content without YAML
- Convert images to base64
- Support for wikilink syntax
- Multi-language support
- Smart attachment folder detection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Obsidian community
- Inspired by the need for easy content sharing with embedded images