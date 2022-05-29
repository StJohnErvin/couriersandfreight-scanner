import * as React from "react"
import { Text, TextProps } from "react-native"

import tw from "../lib/tw"

interface HeadingProps {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  style?: TextProps

  children: string | React.ReactElement
}

const H1 = (props: HeadingProps) => {
  const { style } = props

  return (
    <Text {...props} style={{
      ...style,
      ...tw`font-semibold text-4xl text-[#343434]`
    }}>
      {props.children}
    </Text>
  )
}

const H2 = (props: HeadingProps) => {
  const { style } = props

  return (
    <Text {...props} style={{
      ...style,
      ...tw`font-semibold text-3xl text-[#343434]`
    }}>
      {props.children}
    </Text>
  )
}

const H3 = (props: HeadingProps) => {
  const { style } = props

  return (
    <Text {...props} style={{
      ...style,
      ...tw`font-semibold text-2xl text-[#343434]`
    }}>
      {props.children}
    </Text>
  )
}

const H4 = (props: HeadingProps) => {
  const { style } = props

  return (
    <Text {...props} style={{
      ...style,
      ...tw`font-semibold text-xl text-[#343434]`
    }}>
      {props.children}
    </Text>
  )
}

const P = (props: HeadingProps) => {
  const { style } = props

  return (
    <Text {...props} style={{
      ...style,
      ...tw`font-semibold text-[#343434]`
    }}>
      {props.children}
    </Text>
  )
}

const Heading = (props: HeadingProps) => {

  let H = props.h1 
    ? H1
    : props.h2
    ? H2
    : props.h3
    ? H3
    : props.h4
    ? H4
    : P

  if (!H) {
    return null
  }

  return (
    <H {...props}>{props.children}</H>
  )
}

export default Heading