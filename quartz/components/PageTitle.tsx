// quartz/components/PageTitle.tsx

import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  // 로고 이미지 경로 (static 폴더 기준)
  const logoPath = `${baseDir}/static/logo.png`

  return (
    // classNames 대신 백틱을 사용한 템플릿 리터럴로 클래스를 결합합니다.
    <h1 className={`${displayClass ?? ""} page-title`}>
      <a href={baseDir}>
        {/* 로고 이미지 추가 */}
        <img
          src={logoPath}
          alt="Dino's AI Garden Logo"
          className="site-logo"
        />
        {title}
      </a>
    </h1>
  )
}

export default (() => PageTitle) satisfies QuartzComponentConstructor