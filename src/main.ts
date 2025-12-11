import { MarkdownView, Plugin, Notice, TFile, App } from 'obsidian';

// 多语言支持
interface Translation {
	commands: {
		'copy-markdown-content': {
			name: string;
		};
		'copy-markdown-content-with-images': {
			name: string;
		};
	};
	ribbon: {
		'copy-tooltip': string;
		'copy-images-tooltip': string;
	};
	'editor-menu': {
		copy: string;
		'copy-images': string;
	};
	notices: {
		'no-file-open': string;
		'cannot-get-file': string;
		'copy-success': string;
		'copy-success-with-images': string;
		'copy-failed': string;
	};
}

// 内嵌翻译文本
const translations: Record<string, Translation> = {
	en: {
		commands: {
			'copy-markdown-content': { name: "Copy Markdown Content (Ignore YAML)" },
			'copy-markdown-content-with-images': { name: "Copy Markdown Content with Images as Base64 (Ignore YAML)" }
		},
		ribbon: {
			'copy-tooltip': "Copy Markdown Content",
			'copy-images-tooltip': "Copy Markdown Content with Images as Base64"
		},
		'editor-menu': {
			copy: "Copy Content (Ignore YAML)",
			'copy-images': "Copy Content and Convert Images to Base64"
		},
		notices: {
			'no-file-open': "Please open a markdown file first",
			'cannot-get-file': "Cannot get current file",
			'copy-success': "Copied Markdown Content",
			'copy-success-with-images': "Copied Markdown Content with Base64 Images",
			'copy-failed': "Copy failed"
		}
	},
	zh: {
		commands: {
			'copy-markdown-content': { name: "复制 Markdown 正文（忽略 YAML）" },
			'copy-markdown-content-with-images': { name: "复制 Markdown 正文并转图片为 base64（忽略 YAML）" }
		},
		ribbon: {
			'copy-tooltip': "复制 Markdown 正文",
			'copy-images-tooltip': "复制 Markdown 正文并转图片为 base64"
		},
		'editor-menu': {
			copy: "复制正文（忽略 YAML）",
			'copy-images': "复制正文并转图片为 base64"
		},
		notices: {
			'no-file-open': "请先打开一个 Markdown 文件",
			'cannot-get-file': "无法获取当前文件",
			'copy-success': "已复制 Markdown 正文",
			'copy-success-with-images': "已复制 Markdown 正文（含 base64 图片）",
			'copy-failed': "复制失败"
		}
	},
	'zh-TW': {
		commands: {
			'copy-markdown-content': { name: "複製 Markdown 內容（忽略 YAML）" },
			'copy-markdown-content-with-images': { name: "複製 Markdown 內容並轉圖片為 base64（忽略 YAML）" }
		},
		ribbon: {
			'copy-tooltip': "複製 Markdown 內容",
			'copy-images-tooltip': "複製 Markdown 內容並轉圖片為 base64"
		},
		'editor-menu': {
			copy: "複製內容（忽略 YAML）",
			'copy-images': "複製內容並轉圖片為 base64"
		},
		notices: {
			'no-file-open': "請先開啟一個 Markdown 檔案",
			'cannot-get-file': "無法取得目前檔案",
			'copy-success': "已複製 Markdown 內容",
			'copy-success-with-images': "已複製 Markdown 內容（含 base64 圖片）",
			'copy-failed': "複製失敗"
		}
	},
	ja: {
		commands: {
			'copy-markdown-content': { name: "Markdownコンテンツをコピー（YAMLを無視）" },
			'copy-markdown-content-with-images': { name: "画像をbase64に変換してMarkdownコンテンツをコピー（YAMLを無視）" }
		},
		ribbon: {
			'copy-tooltip': "Markdownコンテンツをコピー",
			'copy-images-tooltip': "画像をbase64に変換してMarkdownコンテンツをコピー"
		},
		'editor-menu': {
			copy: "コンテンツをコピー（YAMLを無視）",
			'copy-images': "コンテンツをコピーして画像をbase64に変換"
		},
		notices: {
			'no-file-open': "最初にMarkdownファイルを開いてください",
			'cannot-get-file': "現在のファイルを取得できません",
			'copy-success': "Markdownコンテンツをコピーしました",
			'copy-success-with-images': "Markdownコンテンツをbase64画像付きでコピーしました",
			'copy-failed': "コピーに失敗しました"
		}
	}
};

class I18n {
	private locale: string = 'en';
	private app: App;

	constructor(app: App) {
		this.app = app;
		this.detectLocale();
	}

	private detectLocale() {
		// 尝试获取系统语言
		const lang = this.app.loadLocalStorage('language') || navigator.language || 'en';

		// 映射语言代码
		const langMap: Record<string, string> = {
			'zh': 'zh',
			'zh-CN': 'zh',
			'zh-TW': 'zh-TW',
			'ja': 'ja',
			'ja-JP': 'ja',
			'en': 'en',
			'en-US': 'en',
			'en-GB': 'en'
		};

		this.locale = langMap[lang] || langMap[lang.split('-')[0]] || 'en';
	}

	t(key: string, fallback?: string): string {
		const translation = translations[this.locale] || translations['en'];

		const keys = key.split('.');
		let value: unknown = translation;

		for (const k of keys) {
			if (typeof value === 'object' && value !== null && k in value) {
				value = (value as Record<string, unknown>)[k];
			} else {
				value = undefined;
				break;
			}
		}

		return (typeof value === 'string' ? value : fallback) || key;
	}
}

let i18n: I18n;

// No settings needed for this plugin
// interface MarkdownCopyHelperSettings {
// 	mySetting: string;
// }

// const DEFAULT_SETTINGS: MarkdownCopyHelperSettings = {
// 	mySetting: 'default'
// }

export default class MarkdownCopyHelperPlugin extends Plugin {
	// settings: MarkdownCopyHelperSettings;

	onload() {
		// 初始化i18n
		i18n = new I18n(this.app);

		// await this.loadSettings();

		// 添加复制 Markdown 正文的图标
		this.addRibbonIcon('copy', i18n.t('ribbon.copy-tooltip'), (evt: MouseEvent) => {
			this.copyMarkdownContent(false);
		});

		// 添加复制 Markdown 正文并转换图片的图标
		this.addRibbonIcon('image', i18n.t('ribbon.copy-images-tooltip'), (evt: MouseEvent) => {
			this.copyMarkdownContent(true);
		});

		// 添加命令
		this.addCommand({
			id: 'copy-markdown-content',
			name: i18n.t('commands.copy-markdown-content.name'),
			callback: () => {
				this.copyMarkdownContent(false);
			}
		});

		this.addCommand({
			id: 'copy-markdown-content-with-images',
			name: i18n.t('commands.copy-markdown-content-with-images.name'),
			callback: () => {
				this.copyMarkdownContent(true);
			}
		});

		// 在编辑器标题栏添加按钮
		this.registerEvent(
			this.app.workspace.on('editor-menu', (menu, editor, view) => {
				menu.addItem((item) => {
					item.setTitle(i18n.t('editor-menu.copy'))
						.setIcon('copy')
						.onClick(() => {
							this.copyMarkdownContent(false);
						});
				});

				menu.addItem((item) => {
					item.setTitle(i18n.t('editor-menu.copy-images'))
						.setIcon('image')
						.onClick(() => {
							this.copyMarkdownContent(true);
						});
				});
			})
		);

		// This plugin doesn't need a settings tab currently
		// this.addSettingTab(new MarkdownCopyHelperSettingTab(this.app, this));
	}

	onunload() {

	}

	/**
	 * 移除 YAML 前置内容
	 */
	private removeYamlFrontMatter(content: string): string {
		// 匹配 YAML 前置内容的正则表达式
		const yamlRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;
		return content.replace(yamlRegex, '');
	}

	/**
	 * 获取 Obsidian 配置的附件文件夹路径
	 */
	private async getAttachmentFolderPath(): Promise<string | null> {
		// 先尝试从运行时配置获取
		try {
			// @ts-ignore - app.vault.config 是内部 API
			const config = this.app.vault.config;

			if (config) {
				const attachmentPath = config.attachmentFolderPath || config.newAttachmentFolderPath;
				if (attachmentPath) {
					return attachmentPath;
				}
			}
		} catch (error) {
			// 忽略错误
		}

		return null;
	}

	/**
	 * 解析图片路径，处理相对路径和 Obsidian 配置的附件路径
	 */
	private async resolveImagePath(imagePath: string, currentFilePath: string): Promise<string> {
		// 如果已经是绝对路径，直接返回
		if (imagePath.startsWith('/')) {
			return imagePath.substring(1); // 移除开头的斜杠
		}

		// 如果路径中包含变量 ${...}，先替换
		// Obsidian 可能使用 ${filename} 等变量
		let processedPath = imagePath;
		const fileName = currentFilePath.substring(currentFilePath.lastIndexOf('/') + 1, currentFilePath.lastIndexOf('.'));
		const folderName = currentFilePath.substring(0, currentFilePath.lastIndexOf('/'));

		// 替换 ${filename} 为当前文件名（不含扩展名）
		processedPath = processedPath.replace(/\$\{filename\}/g, fileName);

		// 替换 ${folder} 为当前文件夹名称
		const currentFolderName = folderName.substring(folderName.lastIndexOf('/') + 1);
		processedPath = processedPath.replace(/\$\{folder\}/g, currentFolderName);

		// 尝试在附件文件夹中查找
		const attachmentFolder = await this.getAttachmentFolderPath();
		if (attachmentFolder) {
			// 处理附件文件夹中的图片
			let attachmentPath: string;
			if (attachmentFolder === '/') {
				attachmentPath = processedPath;
			} else {
				// 处理附件路径
				let cleanAttachmentFolder = attachmentFolder;

				// 如果是以 ./ 开头，表示相对路径，需要基于当前文件路径
				if (cleanAttachmentFolder.startsWith('./')) {
					// 移除 ./
					cleanAttachmentFolder = cleanAttachmentFolder.substring(2);
					// 获取当前文件所在目录
					const currentDir = currentFilePath.substring(0, currentFilePath.lastIndexOf('/'));
					if (currentDir) {
						// 构建相对于当前文件的附件路径
						attachmentPath = `${currentDir}/${cleanAttachmentFolder}/${processedPath}`;
					} else {
						// 当前文件在根目录
						attachmentPath = `${cleanAttachmentFolder}/${processedPath}`;
					}
				} else {
					// 处理绝对路径
					if (cleanAttachmentFolder.startsWith('/')) {
						cleanAttachmentFolder = cleanAttachmentFolder.substring(1);
					}

					// 处理附件路径中可能包含的变量
					cleanAttachmentFolder = cleanAttachmentFolder.replace(/\$\{filename\}/g, fileName);
					cleanAttachmentFolder = cleanAttachmentFolder.replace(/\$\{folder\}/g, currentFolderName);
					attachmentPath = `${cleanAttachmentFolder}/${processedPath}`;
				}
			}

			const file = this.app.vault.getAbstractFileByPath(attachmentPath);
			if (file instanceof TFile) {
				return attachmentPath;
			}
		}

		// 处理相对路径（相对于当前文件）
		const currentDir = currentFilePath.substring(0, currentFilePath.lastIndexOf('/'));
		if (currentDir) {
			const relativePath = `${currentDir}/${processedPath}`;
			const file = this.app.vault.getAbstractFileByPath(relativePath);
			if (file instanceof TFile) {
				return relativePath;
			}
		}

		// 如果在根目录中直接查找
		const file = this.app.vault.getAbstractFileByPath(processedPath);
		if (file instanceof TFile) {
			return processedPath;
		}

		// 都找不到，返回原始路径（让后续逻辑处理错误）
		return imagePath;
	}

	/**
	 * 读取图片文件并转换为 base64
	 */
	private async convertImageToBase64(imagePath: string, currentFilePath: string): Promise<string> {
		try {
			// 解析图片路径
			const resolvedPath = await this.resolveImagePath(imagePath, currentFilePath);

			const file = this.app.vault.getAbstractFileByPath(resolvedPath);
			if (file instanceof TFile) {
				const arrayBuffer = await this.app.vault.readBinary(file);
				const base64 = this.arrayBufferToBase64(arrayBuffer);
				const ext = file.extension.toLowerCase();

				// 根据图片类型确定 MIME 类型
				const mimeType = this.getMimeType(ext);

				return `data:${mimeType};base64,${base64}`;
			} else {
				// 如果找不到图片，返回 [wu] 标记
				return '[wu]';
			}
		} catch (error) {
			// 如果转换失败，返回 [wu] 标记
			return '[wu]';
		}
	}

	/**
	 * 将 ArrayBuffer 转换为 base64 字符串
	 */
	private arrayBufferToBase64(buffer: ArrayBuffer): string {
		let binary = '';
		const bytes = new Uint8Array(buffer);
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary);
	}

	/**
	 * 根据文件扩展名获取 MIME 类型
	 */
	private getMimeType(ext: string): string {
		const mimeTypes: { [key: string]: string } = {
			'jpg': 'image/jpeg',
			'jpeg': 'image/jpeg',
			'png': 'image/png',
			'gif': 'image/gif',
			'webp': 'image/webp',
			'svg': 'image/svg+xml',
			'bmp': 'image/bmp'
		};
		return mimeTypes[ext] || 'image/jpeg';
	}

	/**
	 * 处理 Markdown 内容中的图片链接
	 */
	private async processImages(content: string, currentFilePath: string): Promise<string> {
		const promises: Promise<void>[] = [];
		const replacements: { index: number, length: number, value: string }[] = [];

		// 1. 处理标准 Markdown 图片语法：![alt](path)
		// 支持以下格式：
		// ![alt](path)
		// ![alt](path "title")
		const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

		let match;
		while ((match = markdownImageRegex.exec(content)) !== null) {
			const [fullMatch, alt, pathWithPotentialTitle] = match;
			const index = match.index;

			// 提取路径（去除标题部分）
			const path = pathWithPotentialTitle.replace(/ "([^"]*)"$/, '');

			// 检查是否是网络图片
			if (path.startsWith('http://') || path.startsWith('https://')) {
				continue; // 跳过网络图片
			}

			// 检查是否已经是 base64 格式
			if (path.startsWith('data:')) {
				continue; // 跳过已经是 base64 的图片
			}

			// 处理本地图片
			const promise = this.convertImageToBase64(path, currentFilePath).then(base64Path => {
				// 只有当返回的路径不是原始路径时才替换
				// 这样即使是 [wu] 也会被替换
				if (base64Path !== path) {
					// 如果有标题，需要保留标题
					const titleMatch = pathWithPotentialTitle.match(/ "([^"]*)"$/);
					const title = titleMatch ? ` "${titleMatch[1]}"` : '';
					const replacement = `![${alt}](${base64Path}${title})`;
					replacements.push({ index, length: fullMatch.length, value: replacement });
				}
			}).catch(() => {
				// 忽略错误，convertImageToBase64已经处理了错误情况
			});

			promises.push(promise);
		}

		// 2. 处理 Obsidian Wikilink 图片语法：![[image]]
		// 支持以下格式：
		// ![[image.png]]
		// ![[image.png|alt text]]
		// ![[image.png|alt text|width=100]]
		const wikilinkImageRegex = /!\[\[([^\]]+)\]\]/g;

		while ((match = wikilinkImageRegex.exec(content)) !== null) {
			const [fullMatch, wikilinkContent] = match;
			const index = match.index;

			// 解析 Wikilink 内容
			const parts = wikilinkContent.split('|');
			const imagePath = parts[0].trim();
			const altText = parts[1] && !parts[1].includes('=') ? parts[1].trim() : imagePath;

			// 检查是否是网络图片
			if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
				continue; // 跳过网络图片
			}

			// 检查是否已经是 base64 格式
			if (imagePath.startsWith('data:')) {
				continue; // 跳过已经是 base64 的图片
			}

			// 处理本地图片
			const promise = this.convertImageToBase64(imagePath, currentFilePath).then(base64Path => {
				// 只有当返回的路径不是原始路径时才替换
				// 这样即使是 [wu] 也会被替换
				if (base64Path !== imagePath) {
					// Wikilink 图片转换为标准 Markdown 语法，保留 alt 文本
					const replacement = `![${altText}](${base64Path})`;
					replacements.push({ index, length: fullMatch.length, value: replacement });
				}
			}).catch(() => {
				// 忽略错误，convertImageToBase64已经处理了错误情况
			});

			promises.push(promise);
		}

		await Promise.all(promises);

		// 从后往前替换，避免索引变化
		let result = content;
		replacements.reverse().forEach(({ index, length, value }) => {
			result = result.substring(0, index) + value + result.substring(index + length);
		});

		return result;
	}

	/**
	 * 复制 Markdown 内容
	 */
	async copyMarkdownContent(convertImages: boolean) {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice(i18n.t('notices.no-file-open'));
			return;
		}

		const file = activeView.file;
		if (!file) {
			new Notice(i18n.t('notices.cannot-get-file'));
			return;
		}

		try {
			// 读取文件内容
			let content = await this.app.vault.read(file);

			// 移除 YAML 前置内容
			const contentWithoutYaml = this.removeYamlFrontMatter(content);

			// 如果需要，转换图片为 base64
			if (convertImages) {
				content = await this.processImages(contentWithoutYaml, file.path);
			} else {
				content = contentWithoutYaml;
			}

			// 复制到剪贴板
			await navigator.clipboard.writeText(content);

			const message = convertImages ? i18n.t('notices.copy-success-with-images') : i18n.t('notices.copy-success');
			new Notice(message);

		} catch (error) {
			new Notice(i18n.t('notices.copy-failed'));
		}
	}
}