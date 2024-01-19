import { DocSearchModal, DocSearchProps, useDocSearchKeyboardEvents } from '@docsearch/react'
import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Global } from 'theme-ui'

import {
  BorderRadius,
  BorderWidth,
  buildBorder,
  buildTransition,
  Flex,
  FontSize,
  FontWeight,
  Icon,
  Link,
  Opacity,
  Responsive,
  Spacing,
  Text,
  useTheme,
} from '@edgeandnode/gds'

export function DocSearch(props: DocSearchProps) {
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState<string | undefined>(props.initialQuery || undefined)
  const { theme } = useTheme()

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
    <>
      <Link.Area
        ref={searchButtonRef}
        onClick={onOpen}
        innerFocus
        sx={{
          borderRadius: [BorderRadius.FULL, null, BorderRadius.S],
          '&:focus-visible': { outline: ['none', null, `${BorderWidth['4px']} solid ${theme.colors!.Purple16}`] },
        }}
      >
        <Responsive.Multiple as="span" cases={['mobile', null, 'desktop']}>
          {(caseName) => {
            switch (caseName) {
              case 'mobile':
                return (
                  <Link>
                    <Icon.Search size="20px" />
                  </Link>
                )
                break
              case 'desktop':
                return (
                  <Flex.Row
                    as="span"
                    align="center"
                    gap={Spacing['8px']}
                    sx={{
                      height: '32px',
                      p: Spacing['8px'],
                      borderRadius: BorderRadius.S,
                      bg: 'White8',
                      'button:hover &, button:focus-visible &': {
                        bg: 'White16',
                      },
                      'button:active &': {
                        bg: 'White4',
                      },
                      transition: buildTransition('COLORS'),
                    }}
                  >
                    <Icon.Search
                      title=""
                      size="12px"
                      color="White88"
                      sx={{
                        flexShrink: 0,
                        'button:hover &, button:focus-visible &': { color: 'White' },
                        'button:active &': { color: 'White64' },
                        transition: buildTransition('COLORS'),
                      }}
                    />
                    <Text.P14
                      as="span"
                      size="14px"
                      color="White32"
                      sx={{
                        'button:hover &, button:focus-visible &': { color: 'White88' },
                        'button:active &': { color: 'White48' },
                        transition: buildTransition('COLORS'),
                      }}
                    >
                      {props.translations?.button?.buttonText ?? 'Search'}
                    </Text.P14>
                    <Text.C14
                      as="kbd"
                      size="14px"
                      color="White16"
                      sx={{
                        'button:hover &, button:focus-visible &': { color: 'White48' },
                        'button:active &': { color: 'White16' },
                        transition: buildTransition('COLORS'),
                      }}
                    >
                      <abbr title="Command">⌘</abbr>
                      <span>K</span>
                    </Text.C14>
                  </Flex.Row>
                )
                break
            }
          }}
        </Responsive.Multiple>
      </Link.Area>

      {isOpen ? (
        <>
          {createPortal(
            <DocSearchModal
              {...props}
              initialScrollY={window.scrollY}
              initialQuery={initialQuery}
              translations={props.translations?.modal}
              onClose={onClose}
            />,
            document.body,
          )}
          <Global
            styles={{
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
                m: [null, null, '96px auto auto'],
                border: buildBorder('White8'),
                overflow: 'hidden',
                cursor: 'default',
              },
              '.DocSearch-SearchBar': {
                p: `0 ${Spacing['24px']}`,
                '&::after': {
                  content: `''`,
                  zIndex: 100,
                  position: 'absolute',
                  left: Spacing['24px'],
                  right: Spacing['24px'],
                  bottom: '-1px',
                  borderBottom: buildBorder('White16'),
                  bg: 'var(--docsearch-modal-background)',
                },
              },
              '.DocSearch-Form': {
                p: 0,
              },
              '.DocSearch-MagnifierLabel, .DocSearch-LoadingIndicator': {
                color: 'white',
                svg: {
                  width: '18px',
                  height: '18px',
                },
              },
              '.DocSearch-Input': {
                p: `${Spacing['32px']} ${Spacing['16px']}`,
                outline: 'none',
                fontSize: FontSize['18px'],
              },
              '.DocSearch-Reset': {
                p: 0,
                color: 'White48',
                transition: buildTransition('COLORS'),
                '&:hover': {
                  color: 'White',
                },
              },
              '.DocSearch-Cancel': {
                marginInlineStart: Spacing['16px'],
                marginInlineEnd: Spacing['4px'],
                color: 'inherit',
              },
              '.DocSearch-Dropdown': {
                maxHeight: ['calc(100vh - 96px)', null, 'max(192px, calc(100vh - 288px))'],
                scrollPaddingTop: '32px',
              },
              '.DocSearch-Dropdown-Container': {
                px: [Spacing['16px'], null, Spacing['32px']],
                pt: Spacing['24px'],
                pb: [Spacing['64px'], null, Spacing['24px']],
              },
              '.DocSearch-Hits': {
                width: 'auto',
                '& + .DocSearch-Hits': {
                  mt: Spacing['16px'],
                },
                mark: {
                  color: 'inherit',
                  textDecoration: 'underline',
                },
              },
              '.DocSearch-Hit-source': {
                m: 0,
                mb: Spacing['2px'],
                p: `0 ${Spacing['16px']}`,
                fontWeight: FontWeight.MEDIUM,
                fontSize: FontSize['12px'],
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'White32',
              },
              '.DocSearch-Hit': {
                p: 0,
                a: {
                  p: `0 ${Spacing['16px']}`,
                  borderRadius: BorderRadius.S,
                },
                '&[aria-selected=true] a': {
                  bg: 'White8',
                },
              },
              '.DocSearch-Hit-Container': {
                height: 'auto',
                p: `${Spacing['12px']} 0`,
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
                m: 0,
              },
              '.DocSearch-Hit-title': {
                fontSize: FontSize['16px'],
                fontWeight: FontWeight.SEMIBOLD,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              '.DocSearch-Hit-path': {
                mt: Spacing['4px'],
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
                p: Spacing['16px'],
                bg: 'transparent',
                boxShadow: 'none',
                '&::before': {
                  display: [null, null, 'none'],
                  content: `''`,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  bg: 'var(--docsearch-modal-background)',
                  opacity: Opacity['88%'],
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
                p: 0,
                mb: Spacing['16px'],
                display: 'flex',
                justifyContent: 'center',
              },
              '.DocSearch-NoResults': {
                p: `${Spacing['64px']} 0`,
              },
              '.DocSearch-NoResults-Prefill-List': {
                p: 0,
                mt: Spacing['32px'],
                textAlign: 'center',
              },
            }}
          />
        </>
      ) : null}
    </>
  )
}
