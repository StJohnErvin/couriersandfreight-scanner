import * as React from "react"
import { Animated } from "react-native"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

import tw from "../lib/tw"

const Loading = (props: SvgProps) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  Animated.loop(
    Animated.timing(animation, {
      toValue: 1,
      delay: 500,
      useNativeDriver: true
    }), {
    iterations: Number.MAX_VALUE
  }).start()

  const style = props.style as any
  

  return (
    <Animated.View style={{
      ...tw`h-5 w-5`,
      ...style,
      ...{transform: [{rotate: rotation}] },
    }}>
      <Svg
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <Circle cx={12} cy={12} r={10} stroke="currentColor" />
        <Path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </Svg>
    </Animated.View>
  )
}

export default Loading