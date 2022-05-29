import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export interface LogoProps extends SvgProps {
  width?: number
  height?: number
}

const Logo = (props: LogoProps) => {

  let height = props.height || 50

  return (
    <Svg
      height={height}
      viewBox="0 0 33 50"
      fill="none"
      {...props}
    >
      <Path
        d="M16.5 12.978L0 21.306C3.205 29.168 9.272 38.4 16.5 50.004 23.712 38.4 29.81 29.168 33 21.306l-16.5-8.328z"
        fill="#E7DFDF"
      />
      <Path
        d="M16.5 12.978L0 21.306C3.205 29.168 9.272 38.4 16.5 50.004V12.978zM10.177 4.728v3.405l6.327-3.19v-3.41l-6.327 3.195z"
        fill="#fff"
      />
      <Path
        d="M22.839 4.728v3.405l-6.323-3.19v-3.41l6.323 3.195z"
        fill="#E7DFDF"
      />
      <Path d="M16.5 11.486L3.979 17.803V13.87L16.5 7.545v3.941z" fill="#fff" />
      <Path
        d="M16.5 11.486l12.521 6.317V13.87L16.5 7.545v3.941z"
        fill="#E7DFDF"
      />
      <Path d="M16.5 10.071L3.979 16.388v-3.933L16.5 6.13v3.941z" fill="#fff" />
      <Path
        d="M16.5 10.071l12.521 6.317v-3.933L16.5 6.13v3.941z"
        fill="#E7DFDF"
      />
      <Path
        d="M16.516 2.42L16.5.009l-2.961 1.204v2.705l2.977-1.496z"
        fill="#fff"
      />
      <Path
        d="M16.456 2.412L16.472 0l2.965 1.204V3.91l-2.981-1.497z"
        fill="#E7DFDF"
      />
    </Svg>
  )
}

export default Logo