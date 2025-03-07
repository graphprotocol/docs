import type { WithOptional } from '@edgeandnode/common'
import { ExperimentalIcon as Icon, type ExperimentalIconProps as IconProps } from '@edgeandnode/gds'

interface CalendarIconProps extends WithOptional<IconProps, 'alt'> {
  date?: number
}

// TODO: move to gds
export const CalendarIcon = ({ date = new Date().getDate(), ...props }: CalendarIconProps) => {
  return (
    <Icon alt="Calendar Icon" {...props}>
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            id="calendar-path"
            d="M13 2H11.5V1.5C11.5 1.36739 11.4473 1.24021 11.3536 1.14645C11.2598 1.05268 11.1326 1 11 1C10.8674 1 10.7402 1.05268 10.6464 1.14645C10.5527 1.24021 10.5 1.36739 10.5 1.5V2H5.5V1.5C5.5 1.36739 5.44732 1.24021 5.35355 1.14645C5.25979 1.05268 5.13261 1 5 1C4.86739 1 4.74021 1.05268 4.64645 1.14645C4.55268 1.24021 4.5 1.36739 4.5 1.5V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2ZM3 5V3H4.5V3.5C4.5 3.63261 4.55268 3.75979 4.64645 3.85355C4.74021 3.94732 4.86739 4 5 4C5.13261 4 5.25979 3.94732 5.35355 3.85355C5.44732 3.75979 5.5 3.63261 5.5 3.5V3H10.5V3.5C10.5 3.63261 10.5527 3.75979 10.6464 3.85355C10.7402 3.94732 10.8674 4 11 4C11.1326 4 11.2598 3.94732 11.3536 3.85355C11.4473 3.75979 11.5 3.63261 11.5 3.5V3H13V5H3Z"
          />
          <mask id="text-mask">
            <rect width="16" height="16" fill="white" />
            <text
              x="8"
              y="10"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="7px"
              fontWeight="bold"
            >
              {date}
            </text>
          </mask>
        </defs>
        <use href="#calendar-path" fill="currentColor" mask="url(#text-mask)" />
      </svg>
    </Icon>
  )
}
