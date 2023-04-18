import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

import { buildShadow, buildTransition, useI18n, useTheme } from '@edgeandnode/components'

export type LinkProps = Pick<NextLinkProps, 'replace' | 'scroll' | 'shallow' | 'prefetch'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href?: NextLinkProps['href']
    locale?: string
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

  let finalHref = typeof href === 'object' ? href.href ?? undefined : href

  // If `finalHref` is `undefined`, or if it points to an anchor on the same page, bypass `NextLink`
  if (finalHref === undefined || finalHref.startsWith('#')) {
    return (
      <a href={finalHref} target={target} {...props}>
        {children}
      </a>
    )
  }

  const isInternal = finalHref.startsWith('/')

  // If the link is internal, automatically prepend the locale to it
  if (isInternal) {
    const { locale: pathLocale, pathWithoutLocale } = extractLocaleFromPath(finalHref)
    finalHref = `/${linkLocale ?? pathLocale ?? currentLocale}${pathWithoutLocale}`
  }

  // If the link is external, default the target to `_blank`
  const finalTarget = target ?? (!isInternal ? '_blank' : undefined)

  return (
    <NextLink
      href={finalHref}
      target={finalTarget}
      rel={finalTarget === '_blank' ? 'noopener' : undefined}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      {...props}
    >
      {children}
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
