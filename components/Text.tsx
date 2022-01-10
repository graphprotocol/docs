import { ElementType, HTMLAttributes, Ref } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'
import { FontFamily, FontWeight, BaseColors } from '@edgeandnode/components'

// TODO: Consider moving some of this to `@edgeandnode/components`

export type Opacity = 100 | 88 | 64 | 48 | 32 | 24 | 16 | 12 | 8 | 4 | 2

export type Color = `${keyof typeof BaseColors}${Exclude<Opacity, 100> | ''}`

export enum FontSize {
  '96px' = '96px',
  '64px' = '64px',
  '48px' = '48px',
  '40px' = '40px',
  '32px' = '32px',
  '24px' = '24px',
  '20px' = '20px',
  '18px' = '18px',
  '16px' = '16px',
  '14px' = '14px',
  '12px' = '12px',
  '10px' = '10px',
}

export type FontSizeProperties = {
  [k in keyof typeof FontSize]: {
    lineHeight?: string
    letterSpacing?: string
  }
}

const fontSizeProperties: FontSizeProperties = {
  '96px': {
    lineHeight: '96px', // 1
    letterSpacing: '-2px',
  },
  '64px': {
    lineHeight: '72px', // 1.125
    letterSpacing: '-2px',
  },
  '48px': {
    lineHeight: '56px', // 1.166 - TODO: Different from Figma, talk to Erika
    letterSpacing: '-1.6px',
  },
  '40px': {
    lineHeight: '48px', // 1.2
    letterSpacing: '-1.2px',
  },
  '32px': {
    lineHeight: '40px', // 1.25
    letterSpacing: '-0.8px',
  },
  '24px': {
    lineHeight: '32px', // 1.333
    letterSpacing: '-0.4px',
  },
  '20px': {
    lineHeight: '28px', // 1.4 - TODO: Different from Figma, talk to Erika
  },
  '18px': {
    lineHeight: '26px', // 1.444 - TODO: Different from Figma, talk to Erika
  },
  '16px': {
    lineHeight: '24px', // 1.5
  },
  '14px': {
    lineHeight: '20px', // 1.429
  },
  '12px': {
    lineHeight: '18px', // 1.5 - TODO: Different from Figma, talk to Erika
  },
  '10px': {
    lineHeight: '16px', // 1.6
  },
}

export type TextProps = {
  as?: ElementType
  color?: Color
  // OPTION A
  font?: keyof typeof FontFamily
  weight?: keyof typeof FontWeight
  size?: keyof typeof FontSize
  // OPTION B
  /*
    font?: FontFamily | ((font: typeof FontFamily) => FontFamily)
    weight?: FontWeight | ((weight: typeof FontWeight) => FontWeight)
    size?: FontSize | ((size: typeof FontSize) => FontSize)
    */
  uppercase?: boolean
  truncate?: boolean
  innerRef?: Ref<HTMLElement>
} & HTMLAttributes<HTMLElement>

export const Text = ({
  as,
  color,
  font,
  weight,
  size,
  uppercase,
  truncate,
  innerRef,
  children,
  ...props
}: TextProps) => {
  const Tag = as ?? (truncate ? 'div' : 'span')

  // OPTION B
  /*
  if (typeof font === 'function') {
    font = font(FontFamily)
  }
  if (typeof weight === 'function') {
    weight = weight(FontWeight)
  }
  if (typeof size === 'function') {
    size = size(FontSize)
  }
  */

  const truncateStyles = truncate
    ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    : {}

  return (
    <Tag
      ref={innerRef}
      sx={
        {
          color,
          // OPTION A
          fontFamily: font ? FontFamily[font] : undefined,
          fontWeight: weight ? FontWeight[weight] : undefined,
          fontSize: size ? FontSize[size] : undefined,
          // OPTION B
          /*
          fontFamily: font,
          fontWeight: weight,
          fontSize: size,
          */
          lineHeight: size ? fontSizeProperties[size].lineHeight : undefined,
          letterSpacing: uppercase ? '0.15em' : size ? fontSizeProperties[size].letterSpacing : undefined,
          textTransform: uppercase ? 'uppercase' : undefined,
          ...truncateStyles,
        } as ThemeUIStyleObject
      }
      {...props}
    >
      {children}
    </Tag>
  )
}
