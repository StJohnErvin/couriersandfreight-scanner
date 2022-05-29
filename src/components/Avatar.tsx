import * as React from "react"
import { Image, View } from "react-native"
import tw from "../lib/tw"
import useUserStore from "../store/user"

interface AvatarProps {
  size?: string
  bg?: string
  userId?: string
}

const Avatar = (props: AvatarProps) => {

  const userStore = useUserStore()
  const userId = props.userId || userStore.currentUser
  console.log(userId)
  const user = userStore.users.find(u => u.id === userId)
  const size = props.size || "8"
  const bg = props.bg || "gray-300"

  return (
    <View style={tw.style(`w-${props.size} h-${props.size} border-${bg} bg-${bg} rounded-full`)}>
      <Image source={{ uri: user.avatar }} style={tw`w-${size} h-${size}`} />
    </View>
  )
}

export default Avatar