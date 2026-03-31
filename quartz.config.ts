import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Dino's AI Garden",
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
          // 배경: 완전한 흰색보다 눈이 편안한 아주 연한 민트 그레이 (가독성 베이스)
          light: "#FBFDFB",
          // 테두리: 가독성을 방해하지 않는 선명한 구분선
          lightgray: "#E2E8E4",
          // 보조 텍스트: 기존보다 진하게 조정하여 읽기 쉽게 변경
          gray: "#6A7A70",
          // 본문 텍스트: 가장 중요한 요소. 깊은 숲색으로 대비 극대화
          darkgray: "#2D3A30",
          // 제목 텍스트: 지적인 무게감을 주는 짙은 청록색 차콜
          dark: "#16241B",
          // 링크 및 강조: 영선님이 요청하신 초록+파랑의 조화 (가시성 높은 시안 블루)
          secondary: "#2A6B5F",
          // 보조 강조: 그래프 및 태그용
          tertiary: "#4A8C7F",
          // 하이라이트: 텍스트 뒤에 깔리는 은은한 비취색
          highlight: "rgba(42, 107, 95, 0.07)",
          textHighlight: "#CDEAE5aa",
        },
        darkMode: {
          light: "#161916",
          lightgray: "#2A2E2A",
          gray: "#7A8A7A",
          darkgray: "#D1D9D1",
          dark: "#E8EDE4",
          secondary: "#6DA397", // 다크모드에서도 초록+파랑 조화 유지
          tertiary: "#8EBDB3",
          highlight: "rgba(109, 163, 151, 0.15)",
          textHighlight: "#2A6B5F55",
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