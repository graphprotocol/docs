import { PropsWithChildren, useState, useContext, Fragment } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Text, Flex, Icon, Spacing, BorderRadius, buildTransition } from '@edgeandnode/components'
import { keyframes } from '@emotion/react'

import { NavContext } from '@/layout'
import { NavTree } from '@/components'
import { useI18n } from '@/hooks'

const animationExpand = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' },
})

const animationCollapse = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 },
})

const DesktopWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div
      sx={{
        zIndex: 1,
        position: 'sticky',
        top: 0,
        maxHeight: '100vh',
        pr: Spacing.L_XL,
        py: Spacing.L,
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  )
}

const MobileWrapper = ({ title, children }: PropsWithChildren<{ title?: string }>) => {
  const [open, setOpen] = useState(false)
  const { translations } = useI18n()

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      sx={{
        borderRadius: BorderRadius.S,
        border: open ? 'White8' : 'White4',
        bg: open ? 'White8' : 'White4',
        '&:hover': {
          borderColor: 'White8',
          bg: 'White8',
        },
        transition: buildTransition('COLORS'),
      }}
    >
      <Collapsible.Trigger
        sx={{
          width: 'calc(100% + 2px)',
          m: '-1px',
          border: '1px solid transparent',
        }}
      >
        <Flex.Row
          as="span"
          justify="space-between"
          align="center"
          gap={Spacing.L}
          sx={{ px: Spacing.L_XL, py: '20px' }}
        >
          <Flex.Column as="span" gap={Spacing.S}>
            <Text.S10 color="White64">Docs</Text.S10>
            <Text size="16px">{title}</Text>
          </Flex.Column>
          <Flex.Column
            as="span"
            sx={{
              flexShrink: 0,
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: buildTransition('TRANSFORM'),
            }}
          >
            <Icon.CaretRight title={open ? translations.global.collapse : translations.global.expand} />
          </Flex.Column>
        </Flex.Row>
      </Collapsible.Trigger>
      <Collapsible.Content
        sx={{
          borderTop: 'White8',
          overflow: 'hidden',
          animation: buildTransition((open ? animationExpand.toString() : animationCollapse.toString()) as any),
        }}
      >
        <div
          sx={{
            py: Spacing.L,
          }}
        >
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export const MDXLayoutNav = ({ mobile = false }: { mobile?: boolean }) => {
  const { navItems, currentPage } = useContext(NavContext)!

  const Wrapper = mobile ? MobileWrapper : DesktopWrapper

  return (
    <Wrapper {...(mobile ? { title: currentPage?.title } : {})}>
      <NavTree textProps={mobile ? { weight: 'Normal', size: '16px' } : undefined}>
        {navItems.map((navItem, navItemIndex) => (
          <Fragment key={navItemIndex}>
            {(() => {
              if ('divider' in navItem) {
                return <NavTree.Divider sx={mobile ? { mx: Spacing.L_XL, my: Spacing.L } : {}} />
              }
              if ('children' in navItem) {
                return (
                  <NavTree.Group active={currentPage?.path.startsWith(navItem.path)}>
                    <NavTree.Group.Heading sx={mobile ? { py: 0 } : {}} buttonProps={{ sx: mobile ? {} : { pr: 0 } }}>
                      {navItem.title}
                    </NavTree.Group.Heading>
                    <NavTree.Group.Content>
                      {navItem.children.map((childNavItem, childNavItemIndex) => (
                        <NavTree.Item
                          key={childNavItemIndex}
                          href={childNavItem.path}
                          active={currentPage?.path === childNavItem.path}
                          sx={mobile ? { py: 0 } : {}}
                          linkProps={{ sx: mobile ? {} : { pr: 0 } }}
                        >
                          {childNavItem.title}
                        </NavTree.Item>
                      ))}
                    </NavTree.Group.Content>
                  </NavTree.Group>
                )
              }
              return (
                <NavTree.Item
                  href={navItem.path}
                  active={currentPage?.path === navItem.path}
                  sx={mobile ? { py: 0 } : {}}
                  linkProps={{ sx: mobile ? {} : { pr: 0 } }}
                  diamondProps={{ sx: mobile ? { left: '6px' } : {} }}
                >
                  {navItem.title}
                </NavTree.Item>
              )
            })()}
          </Fragment>
        ))}
      </NavTree>
    </Wrapper>
  )
}
