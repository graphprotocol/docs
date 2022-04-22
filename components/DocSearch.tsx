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
  FontSize,
  FontWeight,
  buildTransition,
  buildBorder,
  GlobalTheme,
} from '@edgeandnode/components'
import { dispatch } from 'use-bus'

import { useI18n } from '../i18n'
import { EventType } from '../types'

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
    dispatch(EventType.SEARCH_CLOSE)
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
          <Icon.Search size="14px" title="" />
          <Text.P14 size="14px">{t('global.search')}</Text.P14>
        </Flex.Row>
      </button>

      {isOpen &&
        createPortal(
          <DocSearchModal
            {...props}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            translations={props?.translations?.modal}
            onClose={onClose}
          />,
          document.body
        )}

      <Global
        styles={(theme: GlobalTheme) => ({
          html: {
            '--docsearch-modal-width': 'min(calc(100vw - 32px), 1124px) !important',
            '--docsearch-modal-background': '#1b1631 !important',
            '--docsearch-modal-shadow': 'none !important',
            '--docsearch-searchbox-focus-background': 'transparent !important',
            '--docsearch-searchbox-shadow': 'none !important',
            '--docsearch-hit-background': 'transparent !important',
            '--docsearch-highlight-color': `${theme.colors!.Purple} !important`,
          },
          '.DocSearch-Modal': {
            border: buildBorder('White8')(theme),
          },
          '.DocSearch-SearchBar': {
            padding: `${Spacing.M} 28px`,
          },
          '.DocSearch-Form': {
            padding: 0,
          },
          '.DocSearch-MagnifierLabel, .DocSearch-LoadingIndicator': {
            color: 'white',
            svg: {
              width: '16px',
              height: '16px',
            },
          },
          '.DocSearch-Input': {
            paddingLeft: Spacing.L,
            outline: 'none',
            fontSize: FontSize['16px'],
          },
          '.DocSearch-Dropdown': {
            minHeight: 0,
          },
          '.DocSearch-Hits': {
            marginBottom: '0 !important',
            padding: `${Spacing.L} 0`,
            '&::before': {
              content: `''`,
              position: 'absolute',
              left: Spacing.L,
              right: Spacing.L,
              top: 0,
              borderTop: buildBorder('White16')(theme),
            },
          },
          '.DocSearch-Hit-source': {
            display: 'none',
          },
          '.DocSearch-Hit': {
            a: {
              padding: `0 ${Spacing.L}`,
            },
          },
          '.DocSearch-Hit-Container': {
            height: 'auto',
            padding: `${Spacing.L} 0`,
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
            // TODO: We should display the Algolia logo somewhere
            display: 'none',
          },
          '.DocSearch-Screen-Icon': {
            display: 'flex',
            justifyContent: 'center',
          },
        })}
      />
    </div>
  )
}
