import * as React from "react"
import { View } from "react-native"

import tw from "../lib/tw"

interface PanelProps {
  children: React.ReactElement | React.ReactElement[]
}

const Panel = (props: PanelProps) => {
  return (
    <View style={tw`rounded-4xl border border-white w-full h-full bg-white shadow-md p-6`}>
      {props.children}
    </View>
  )
}

export default Panel