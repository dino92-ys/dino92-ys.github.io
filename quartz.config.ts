import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "이영선의 AI 학습 노트",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ko-KR",
    baseUrl: "dino92-ys.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Nanum Myeongjo",
        body: "IBM Plex Sans KR",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#F9F7F2",
          lightgray: "#E8E4DA",
          gray: "#A8A498",
          darkgray: "#4A4A40",
          dark: "#2C2C26",
          secondary: "#5C7A5A",
          tertiary: "#8FAE6B",
          highlight: "rgba(92, 122, 90, 0.08)",
          textHighlight: "#D4E4A0aa",
        },
        darkMode: {
          light: "#1A1E1A",
          lightgray: "#2A2E2A",
          gray: "#6B7B68",
          darkgray: "#CDD5C8",
          dark: "#E8EDE4",
          secondary: "#8FAE6B",
          tertiary: "#B8D48A",
          highlight: "rgba(143, 174, 107, 0.12)",
          textHighlight: "#5C7A5A55",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
