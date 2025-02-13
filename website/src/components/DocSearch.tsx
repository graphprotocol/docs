import {
  DocSearchModal,
  type DocSearchProps as OriginalDocSearchProps,
  useDocSearchKeyboardEvents,
} from '@docsearch/react'
import { keyframes } from '@emotion/react'
import { type ReactNode, type RefObject, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Global } from 'theme-ui'

import {
  BorderRadius,
  buildBorder,
  buildTransition,
  FontSize,
  FontWeight,
  LineHeight,
  Opacity,
  Spacing,
  useTheme,
} from '@edgeandnode/gds'

const animationFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

interface DocSearchProps extends OriginalDocSearchProps {
  children: (renderProps: {
    buttonRef: RefObject<HTMLButtonElement>
    openModal: () => void
    isModalOpen: boolean
  }) => ReactNode
}

export function DocSearch({ children, ...props }: DocSearchProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState<string | undefined>(props.initialQuery || undefined)
  const { theme } = useTheme()

  useDocSearchKeyboardEvents({
    isOpen: isModalOpen,
    onOpen: () => setIsModalOpen(true),
    onClose: () => setIsModalOpen(false),
    onInput: (event) => {
      setIsModalOpen(true)
      setInitialQuery(event.key)
    },
    searchButtonRef: buttonRef,
  })

  return (
    <>
      {children({ buttonRef, openModal: (open = true) => setIsModalOpen(open), isModalOpen })}

      {isModalOpen ? (
        <>
          {createPortal(
            <DocSearchModal
              {...props}
              initialScrollY={window.scrollY}
              initialQuery={initialQuery}
              translations={props.translations?.modal}
              onClose={() => setIsModalOpen(false)}
            />,
            document.body,
          )}
          <Global
            styles={{
              html: {
                '--docsearch-spacing': '0 !important',
                '--docsearch-container-background': `${theme.colors.Midnight88} !important`,
                '--docsearch-modal-width': 'min(calc(100vw - 32px), 840px) !important',
                '--docsearch-modal-background': `${theme.colors.Tooltip} !important`,
                '--docsearch-modal-shadow': 'none !important',
                '--docsearch-searchbox-height': ['64px !important', null, '96px !important'],
                '--docsearch-searchbox-focus-background': 'transparent !important',
                '--docsearch-searchbox-shadow': 'none !important',
                '--docsearch-hit-background': 'transparent !important',
                '--docsearch-hit-color': `${theme.colors.White88} !important`,
                '--docsearch-hit-active-color': `${theme.colors.White} !important`,
                '--docsearch-highlight-color': `${theme.colors.Purple} !important`,
              },
              '.DocSearch-Container': {
                animation: `${animationFadeIn} 150ms ease-in-out`,
              },
              '.DocSearch-Modal': {
                m: [null, null, '96px auto auto'],
                border: [null, null, 'White8'],
                overflow: 'hidden',
                cursor: 'default',
              },
              '.DocSearch-SearchBar': {
                p: [`0 ${Spacing['16px']}`, null, `0 ${Spacing['24px']}`],
                '&::after': {
                  content: `''`,
                  zIndex: 100,
                  position: 'absolute',
                  left: [Spacing['16px'], null, Spacing['24px']],
                  right: [Spacing['16px'], null, Spacing['24px']],
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
                  width: '20px',
                  height: '20px',
                },
              },
              '.DocSearch-Search-Icon': {
                left: '3px',
                color: 'transparent',
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="fill: white;"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.70768 1C9.85995 1 12.4154 3.55542 12.4154 6.70768C12.4154 8.08963 11.9242 9.35686 11.107 10.3444C11.3349 10.5734 11.6474 10.8859 12.0424 11.2809L12.4833 11.7218C13.1109 12.3494 13.8972 13.1357 14.8423 14.0808C15.0526 14.2911 15.0526 14.632 14.8423 14.8423C14.632 15.0526 14.2911 15.0526 14.0808 14.8423L10.3444 11.107C9.35686 11.9242 8.08963 12.4154 6.70768 12.4154C3.55542 12.4154 1 9.85995 1 6.70768C1 3.55542 3.55542 1 6.70768 1ZM6.70768 2.07692C4.15018 2.07692 2.07692 4.15018 2.07692 6.70768C2.07692 9.26518 4.15018 11.3384 6.70768 11.3384C9.26518 11.3384 11.3384 9.26518 11.3384 6.70768C11.3384 4.15018 9.26518 2.07692 6.70768 2.07692Z" /></svg>')`,
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
                maxHeight: ['calc(100dvh - 96px)', null, 'max(192px, calc(100dvh - 288px))'],
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
                p: `${Spacing['8px']} ${Spacing['16px']}`,
                fontWeight: FontWeight.MEDIUM,
                fontSize: FontSize['12px'],
                lineHeight: LineHeight.TIGHT,
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
                fontWeight: FontWeight.MEDIUM,
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
                mt: Spacing['48px'],
                textAlign: 'center',
                ul: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: Spacing['8px'],
                  li: {
                    listStyle: 'none',
                  },
                },
              },
              '.DocSearch-Prefill': {
                fontWeight: FontWeight.REGULAR,
              },
            }}
          />
        </>
      ) : null}
    </>
  )
}
