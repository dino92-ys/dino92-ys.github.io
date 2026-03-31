import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
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
          // 배경: 더 깨끗하고 아주 살짝 푸른빛이 도는 연한 민트/그레이 톤
          light: "#F4F7F5",
          // 테두리 및 구분선: 차분한 올리브 블루
          lightgray: "#DEE5E0",
          // 보조 텍스트: 채도가 낮은 녹회색
          gray: "#8A9A8E",
          // 본문 텍스트: 신뢰감 있는 짙은 청록색 계열의 차콜
          darkgray: "#3A4D40",
          // 제목 텍스트: 깊은 숲속의 짙은 녹색
          dark: "#1B2E20",
          // 메인 강조색(링크): 요청하신 초록 + 파랑의 조화 (Deep Sea Green)
          secondary: "#387C6D",
          // 보조 강조색(그래프 노드 등): 조금 더 밝은 청록색
          tertiary: "#5E9387",
          // 하이라이트: 은은한 에메랄드 블루 배경
          highlight: "rgba(56, 124, 109, 0.1)",
          textHighlight: "#BEE3DBaa",
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
      Plugin.CustomOgImages(),
    ],
  },
}

export default config