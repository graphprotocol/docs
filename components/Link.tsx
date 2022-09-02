import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

import { buildShadow, buildTransition, useTheme } from '@edgeandnode/components'

import { AppLocale, useI18n } from '@/i18n'

export type LinkProps = Pick<NextLinkProps, 'replace' | 'scroll' | 'shallow' | 'prefetch'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href?: NextLinkProps['href']
    locale?: AppLocale
  }

export const Link = ({
  href,
  replace,
  scroll,
  shallow,
  prefetch,
  target,
  children,
  locale: linkLocale,
  ...props
}: LinkProps) => {
  const { locale: currentLocale, extractLocaleFromPath } = useI18n()

  // If `href` is undefined, or is a string that links to an anchor on the same page, bypass `NextLink`
  if (href === undefined || (typeof href === 'string' && href.startsWith('#'))) {
    return (
      <a href={href} target={target} {...props}>
        {children}
      </a>
    )
  }

  // Determine whether the link is internal
  const isInternal =
    (typeof href === 'string' && href.startsWith('/')) ||
    (typeof href === 'object' && !href.host && href.pathname?.startsWith('/'))

  // If the link is internal, automatically prepend the locale
  let finalHref = href
  if (isInternal) {
    const path = typeof finalHref === 'object' ? finalHref.pathname ?? '' : finalHref
    const { locale: pathLocale, pathWithoutLocale } = extractLocaleFromPath(path)
    const pathWithLocale = `/${linkLocale ?? pathLocale ?? currentLocale}${pathWithoutLocale}`
    if (typeof finalHref === 'object') {
      finalHref.pathname = pathWithLocale
    } else {
      finalHref = pathWithLocale
    }
  }

  // If the link is external, default the target to `_blank`
  const finalTarget = target ?? (!isInternal ? '_blank' : undefined)

  const nextLinkProps = {
    href: finalHref,
    replace,
    scroll,
    shallow,
    prefetch,
  }
  return (
    <NextLink {...nextLinkProps} passHref>
      <a target={finalTarget} rel={finalTarget === '_blank' ? 'noopener' : undefined} {...props}>
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
