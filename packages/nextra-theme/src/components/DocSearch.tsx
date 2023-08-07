import { DocSearchModal, DocSearchProps, useDocSearchKeyboardEvents } from '@docsearch/react'
import { Global } from '@emotion/react'
import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Theme } from 'theme-ui'

import {
  BorderRadius,
  buildBorder,
  buildTransition,
  Flex,
  FontSize,
  FontWeight,
  Icon,
  Opacity,
  Spacing,
  Text,
} from '@edgeandnode/gds'

const BREAKPOINT = '751px'

export function DocSearch(props: DocSearchProps) {
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState<string | undefined>(props.initialQuery || undefined)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = useCallback(
    (event: KeyboardEvent) => {
      setIsOpen(true)
      setInitialQuery(event.key)
    },
    [setIsOpen, setInitialQuery],
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  return (
    <div sx={{ px: [Spacing['16px'], null, null, 0] }}>
      {/* TODO: Replace by `Chip` component when it's ready in the new GDS */}
      <button type="button" ref={searchButtonRef} onClick={onOpen} sx={{ width: '100%' }}>
        <Flex.Row
          align="center"
          gap={Spacing['8px']}
          sx={{
            height: '32px',
            px: Spacing['8px'],
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
          <Text.P14 size="14px">{props.translations?.button?.buttonText ?? 'Search'}</Text.P14>
          <Text.P14 as="kbd" size="14px" color="White48" sx={{ marginInlineStart: 'auto', px: Spacing['8px'] }}>
            <abbr title="Command" sx={{ textDecoration: 'none' }}>
              ⌘
            </abbr>
            <span sx={{ marginInlineStart: Spacing['4px'] }}>K</span>
          </Text.P14>
        </Flex.Row>
      </button>

      {isOpen
        ? createPortal(
            <DocSearchModal
              {...props}
              initialScrollY={window.scrollY}
              initialQuery={initialQuery}
              translations={props.translations?.modal}
              onClose={onClose}
            />,
            document.body,
          )
        : null}

      <Global
        styles={(theme: Theme) => ({
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
            '--docsearch-hit-color': `${theme.colors!.White88} !important`,
            '--docsearch-hit-active-color': `${theme.colors!.White} !important`,
            '--docsearch-highlight-color': `${theme.colors!.Purple} !important`,
          },
          '.DocSearch-Modal': {
            border: buildBorder('White8')(theme),
            overflow: 'hidden',
            cursor: 'default',
            [`@media (min-width: ${BREAKPOINT})`]: {
              margin: '96px auto auto',
            },
          },
          '.DocSearch-SearchBar': {
            padding: `0 ${Spacing['24px']}`,
            '&::after': {
              content: `''`,
              zIndex: 100,
              position: 'absolute',
              left: Spacing['24px'],
              right: Spacing['24px'],
              bottom: '-1px',
              borderBottom: buildBorder('White16')(theme),
              backgroundColor: 'var(--docsearch-modal-background)',
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
            padding: `${Spacing['32px']} ${Spacing['16px']}`,
            outline: 'none',
            fontSize: FontSize['18px'],
          },
          '.DocSearch-Reset': {
            padding: 0,
            color: `${theme.colors!.White48}`,
            transition: buildTransition('COLORS'),
            '&:hover': {
              color: `${theme.colors!.White}`,
            },
          },
          '.DocSearch-Cancel': {
            marginInlineStart: Spacing['16px'],
            marginInlineEnd: Spacing['4px'],
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
            padding: `${Spacing['24px']} ${Spacing['16px']}`,
            paddingBottom: Spacing['64px'],
            [`@media (min-width: ${BREAKPOINT})`]: {
              padding: `${Spacing['24px']} ${Spacing['32px']}`,
            },
          },
          '.DocSearch-Hits': {
            width: 'auto',
            '& + .DocSearch-Hits': {
              marginTop: Spacing['16px'],
            },
            mark: {
              color: 'inherit',
              textDecoration: 'underline',
            },
          },
          '.DocSearch-Hit-source': {
            margin: 0,
            marginBottom: Spacing['2px'],
            padding: `0 ${Spacing['16px']}`,
            fontWeight: FontWeight.MEDIUM,
            fontSize: FontSize['12px'],
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: `${theme.colors!.White32}`,
          },
          '.DocSearch-Hit': {
            padding: 0,
            a: {
              padding: `0 ${Spacing['16px']}`,
              borderRadius: BorderRadius.S,
            },
            '&[aria-selected=true] a': {
              backgroundColor: `${theme.colors!.White8}`,
            },
          },
          '.DocSearch-Hit-Container': {
            height: 'auto',
            padding: `${Spacing['12px']} 0`,
          },
          '.DocSearch-Hit-Tree': {
            width: Spacing['16px'],
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
            fontWeight: FontWeight.SEMIBOLD,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '.DocSearch-Hit-path': {
            marginTop: Spacing['4px'],
            fontSize: FontSize['16px'],
            fontWeight: FontWeight.REGULAR,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '.DocSearch-Hit-action': {
            marginInlineStart: Spacing['16px'],
          },
          '.DocSearch-HitsFooter': {
            display: 'none',
          },
          '.DocSearch-Footer': {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: Spacing['16px'],
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
            marginBottom: Spacing['16px'],
            display: 'flex',
            justifyContent: 'center',
          },
          '.DocSearch-NoResults': {
            padding: `${Spacing['64px']} 0`,
          },
          '.DocSearch-NoResults-Prefill-List': {
            padding: 0,
            marginTop: Spacing['32px'],
            textAlign: 'center',
          },
        })}
      />
    </div>
  )
}
