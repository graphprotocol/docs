import { useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Global } from '@emotion/react'
import { DocSearchModal, DocSearchProps, useDocSearchKeyboardEvents } from '@docsearch/react'
import {
  Text,
  Flex,
  Icon,
  Spacing,
  BorderRadius,
  Opacity,
  FontWeight,
  FontSize,
  buildTransition,
  buildBorder,
  GlobalTheme,
} from '@edgeandnode/components'
import { dispatch } from 'use-bus'

import { useI18n } from '../i18n'
import { EventType } from '../types'

const BREAKPOINT = '751px'

export function DocSearch(props: DocSearchProps) {
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState<string | undefined>(props?.initialQuery || undefined)
  const { t } = useI18n()

  const onOpen = useCallback(() => {
    setIsOpen(true)
    dispatch(EventType.SEARCH_OPEN)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      dispatch(EventType.SEARCH_CLOSE)
    }, 0)
  }, [setIsOpen])

  const onInput = useCallback(
    (event: KeyboardEvent) => {
      setIsOpen(true)
      setInitialQuery(event.key)
    },
    [setIsOpen, setInitialQuery]
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  return (
    <div sx={{ px: [Spacing.L, null, null, 0] }}>
      {/* TODO: Replace by `Chip` component when it's ready in the new GDS */}
      <button type="button" ref={searchButtonRef} onClick={onOpen} sx={{ width: '100%' }}>
        <Flex.Row
          align="center"
          gap={Spacing.M}
          sx={{
            height: '32px',
            px: Spacing.M,
            borderRadius: BorderRadius.FULL,
            border: 'White4',
            bg: 'White4',
            'button:hover &': {
              borderColor: 'White16',
            },
            transition: buildTransition('COLORS'),
          }}
        >
          <Icon.Search size="14px" title="" sx={{ flexShrink: 0 }} />
          <Text.P14 size="14px">{props?.translations?.button?.buttonText ?? 'Search'}</Text.P14>
          <Text.P14 as="kbd" size="14px" color="White48" sx={{ ml: 'auto', px: Spacing.M }}>
            <abbr title="Command" sx={{ fontSize: '1.2em', verticalAlign: 'middle' }}>
              ⌘
            </abbr>
            <span sx={{ ml: Spacing.S }}>K</span>
          </Text.P14>
        </Flex.Row>
      </button>

      {isOpen
        ? createPortal(
            <DocSearchModal
              {...props}
              initialScrollY={window.scrollY}
              initialQuery={initialQuery}
              translations={props?.translations?.modal}
              onClose={onClose}
            />,
            document.body
          )
        : null}

      <Global
        styles={(theme: GlobalTheme) => ({
          html: {
            '--docsearch-spacing': '0 !important',
            '--docsearch-container-background': `${theme.colors!.Midnight88} !important`,
            '--docsearch-modal-width': 'min(calc(100vw - 32px), 840px) !important',
            '--docsearch-modal-background': '#292738 !important',
            '--docsearch-modal-shadow': 'none !important',
            '--docsearch-searchbox-height': '96px !important',
            '--docsearch-searchbox-focus-background': 'transparent !important',
            '--docsearch-searchbox-shadow': 'none !important',
            '--docsearch-hit-background': 'transparent !important',
            '--docsearch-highlight-color': `${theme.colors!.Purple} !important`,
          },
          '.DocSearch-Modal': {
            border: buildBorder('White8')(theme),
            overflow: 'hidden',
            [`@media (min-width: ${BREAKPOINT})`]: {
              margin: '96px auto auto',
            },
          },
          '.DocSearch-SearchBar': {
            padding: `0 ${Spacing.L_XL}`,
            '&::after': {
              content: `''`,
              zIndex: 100,
              position: 'absolute',
              left: Spacing.XL,
              right: Spacing.XL,
              bottom: '-1px',
              borderBottom: buildBorder('White16')(theme),
              backgroundColor: 'var(--docsearch-modal-background)',
              [`@media (min-width: ${BREAKPOINT})`]: {
                left: Spacing.XL_XXL,
                right: Spacing.XL_XXL,
              },
            },
          },
          '.DocSearch-Form': {
            padding: 0,
          },
          '.DocSearch-MagnifierLabel, .DocSearch-LoadingIndicator': {
            color: 'white',
            svg: {
              width: '18px',
              height: '18px',
            },
          },
          '.DocSearch-Input': {
            padding: `${Spacing.XL} ${Spacing.L}`,
            outline: 'none',
            fontSize: FontSize['18px'],
          },
          '.DocSearch-Cancel': {
            marginLeft: Spacing.L,
            marginRight: Spacing.M,
            color: 'inherit',
          },
          '.DocSearch-Dropdown': {
            maxHeight: 'calc(100vh - 96px)',
            [`@media (min-width: ${BREAKPOINT})`]: {
              maxHeight: 'max(192px, calc(100vh - 288px))',
            },
            scrollPaddingTop: '32px',
          },
          '.DocSearch-Dropdown-Container': {
            padding: `${Spacing.L_XL} ${Spacing.L}`,
            paddingBottom: Spacing.XXL,
            [`@media (min-width: ${BREAKPOINT})`]: {
              padding: `${Spacing.L_XL} ${Spacing.XL}`,
            },
          },
          '.DocSearch-Hits': {
            '& + .DocSearch-Hits': {
              marginTop: Spacing.L,
            },
            mark: {
              color: 'inherit',
              textDecoration: 'underline',
            },
          },
          '.DocSearch-Hits, .DocSearch-NoResults': {
            width: 'auto',
          },
          '.DocSearch-Hit-source': {
            margin: 0,
            marginBottom: Spacing.XS,
            padding: `0 ${Spacing.L}`,
            fontWeight: FontWeight.Medium,
            fontSize: FontSize['12px'],
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: `${theme.colors!.White32}`,
          },
          '.DocSearch-Hit': {
            padding: 0,
            a: {
              padding: `0 ${Spacing.L}`,
              borderRadius: BorderRadius.S,
            },
            '&[aria-selected=true] a': {
              backgroundColor: `${theme.colors!.White8}`,
            },
          },
          '.DocSearch-Hit-Container': {
            height: 'auto',
            padding: `${Spacing.M_L} 0`,
          },
          '.DocSearch-Hit-Tree': {
            height: 0,
            opacity: 0,
          },
          '.DocSearch-Hit-icon': {
            display: 'none',
          },
          '.DocSearch-Hit-content-wrapper': {
            margin: 0,
          },
          '.DocSearch-Hit-title': {
            fontSize: FontSize['16px'],
            fontWeight: FontWeight.Semibold,
          },
          '.DocSearch-Hit-path': {
            marginTop: Spacing.S,
            fontSize: FontSize['16px'],
            fontWeight: FontWeight.Normal,
          },
          '.DocSearch-Hit-action': {
            marginLeft: Spacing.L,
          },
          '.DocSearch-HitsFooter': {
            display: 'none',
          },
          '.DocSearch-Footer': {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: Spacing.L,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&::before': {
              content: `''`,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: 'var(--docsearch-modal-background)',
              opacity: Opacity['88%'],
              [`@media (min-width: ${BREAKPOINT})`]: {
                display: 'none',
              },
            },
          },
          '.DocSearch-Logo': {
            a: {
              opacity: Opacity['64%'],
              willChange: 'opacity',
              transition: buildTransition('OPACITY'),
              '&:hover': {
                opacity: Opacity['88%'],
              },
            },
          },
          '.DocSearch-Commands': {
            display: 'none',
          },
          '.DocSearch-Screen-Icon': {
            padding: 0,
            marginBottom: Spacing.L,
            display: 'flex',
            justifyContent: 'center',
          },
          '.DocSearch-NoResults': {
            padding: `${Spacing.XXL} 0`,
          },
          '.DocSearch-NoResults-Prefill-List': {
            padding: 0,
            marginTop: Spacing.XL,
          },
        })}
      />
    </div>
  )
}
