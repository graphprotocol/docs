import { ComponentProps } from 'react';
import { shade } from './utils';

type CircleProps = ComponentProps<'svg'> & { color?: string; tw?: string };

export function RightSmallCircle({ color = '#f25c40', ...props }: CircleProps) {
  return (
    <svg
      width="310"
      height="316"
      viewBox="0 0 310 316"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_b_1686_12556)">
        <circle cx="158" cy="158" r="158" fill="url(#paint0_linear_1686_12556)" fillOpacity="0.4" />
        <circle cx="158" cy="158" r="156" stroke="url(#paint1_linear_1686_12556)" strokeWidth="4" />
      </g>
      <defs>
        <filter
          id="filter0_b_1686_12556"
          x="-94"
          y="-94"
          width="504"
          height="504"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="47" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1686_12556" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1686_12556"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1686_12556"
          x1="124.485"
          y1="131.667"
          x2="345.661"
          y2="295.327"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={shade(color, -50)} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1686_12556"
          x1="124.485"
          y1="131.667"
          x2="158"
          y2="267.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={shade(color, -50)} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function RightCircle({ color = '#7433ff', ...props }: CircleProps) {
  return (
    <svg
      width="205"
      height="616"
      viewBox="0 0 205 616"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="308" cy="308" r="308" fill="url(#paint0_linear_1686_12554)" />
      <defs>
        <linearGradient
          id="paint0_linear_1686_12554"
          x1="0"
          y1="0"
          x2="742.578"
          y2="337.493"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={shade(color, -50)} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LeftCircle({ color = '#1cc8ee', ...props }: CircleProps) {
  return (
    <svg
      width="572"
      height="584"
      viewBox="0 0 572 584"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.4" filter="url(#filter0_f_2101_15208)">
        <circle cx="70" cy="81.9999" r="308" fill="url(#paint0_linear_2101_15208)" />
      </g>
      <circle
        cx="48"
        cy="17"
        r="308"
        transform="rotate(-57.2911 48 17)"
        fill="url(#paint1_linear_2101_15208)"
      />
      <defs>
        <filter
          id="filter0_f_2101_15208"
          x="-432"
          y="-420"
          width="1004"
          height="1004"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="97" result="effect1_foregroundBlur_2101_15208" />
        </filter>
        <linearGradient
          id="paint0_linear_2101_15208"
          x1="-307.41"
          y1="-247.818"
          x2="617.862"
          y2="682.861"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={shade(color, 50)} />
          <stop offset="1" stopColor={shade(color, 100)} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2101_15208"
          x1="-230.791"
          y1="17.773"
          x2="659.231"
          y2="554.86"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={shade(color, 100)} />
        </linearGradient>
      </defs>
    </svg>
  );
}
