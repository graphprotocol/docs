import { type HTMLAttributes, useContext } from 'react'

import { Icon, Link, useI18n } from '@edgeandnode/gds'

import { NavContext } from '../layout/NavContext'

export type EditPageLinkProps = {
  mobile?: boolean
} & Omit<HTMLAttributes<HTMLElement>, 'color' | 'children'>

export const EditPageLink = ({ mobile = false, ...props }: EditPageLinkProps) => {
  const { t } = useI18n<any>()

  // If the current page is in a language other than English, link to the English version, as translations are handled by Crowdin
  const { filePath } = useContext(NavContext)!
  const [, fileLocale, ...filePathSegments] = filePath.split('/')
  const path = filePath.startsWith('https')
    ? filePath
    : `https://github.com/graphprotocol/docs/blob/main/website/pages/${
        fileLocale && ['en', '[locale]'].includes(fileLocale) ? fileLocale : 'en'
      }/${filePathSegments.join('/')}`
  return (
    <Link href={path} target="_blank" size={mobile ? '16px' : '14px'} {...props}>
      <Icon.LogoGitHub title="" />
      {t('global.editPage')}
    </Link>
  )
}
