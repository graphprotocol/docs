import { AnchorHTMLAttributes } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { useTheme, buildShadow, buildTransition } from '@edgeandnode/components'

import { Locale, useI18n, getPathWithLocale } from '@/i18n'

export type LinkProps = Pick<NextLinkProps, 'replace' | 'scroll' | 'shallow' | 'prefetch'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href?: NextLinkProps['href']
    locale?: Locale
  }

export const Link = ({ href, replace, scroll, shallow, prefetch, target, children, locale, ...props }: LinkProps) => {
  const { locale: currentLocale } = useI18n()
  const rel = target === '_blank' ? 'noopener' : undefined

  // If `href` is undefined or links to an anchor on the same page, bypass `NextLink`
  if (href === undefined || (typeof href === 'string' && href.startsWith('#'))) {
    return (
      <a href={href} target={target} rel={rel} {...props}>
        {children}
      </a>
    )
  }

  const isInternal =
    (typeof href === 'string' && href.startsWith('/')) ||
    (typeof href === 'object' && !href.host && href.pathname?.startsWith('/'))

  // If the URL is internal, automatically prepend the locale
  if (isInternal) {
    const path = typeof href === 'object' ? href.pathname ?? '' : href
    locale = locale ?? currentLocale
    const pathWithLocale = getPathWithLocale(path, locale)
    if (typeof href === 'object') {
      href.pathname = pathWithLocale
    } else {
      href = pathWithLocale
    }
  }

  const nextLinkProps = {
    href,
    replace,
    scroll,
    shallow,
    prefetch,
  }
  return (
    <NextLink {...nextLinkProps} passHref>
      <a target={target} rel={rel} {...props}>
        {children}
      </a>
    </NextLink>
  )
}

export const LinkInline = (props: LinkProps) => {
  const { theme } = useTheme()

  return (
    <Link
      sx={{
        paddingBottom: '0.25em',
        backgroundImage: `linear-gradient(to bottom, ${theme.colors!.Purple64}, ${theme.colors!.Purple64})`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '100% 10%',
        backgroundPosition: '0% 85%',
        color: 'White88',
        '&:hover': {
          backgroundImage: `linear-gradient(to bottom, ${theme.colors!.Purple}, ${theme.colors!.Purple})`,
          backgroundPosition: '0% 95%',
          color: 'White',
          textShadow: buildShadow('S'),
        },
        transition: buildTransition('background-position, color, text-shadow' as any),
      }}
      {...props}
    />
  )
}
