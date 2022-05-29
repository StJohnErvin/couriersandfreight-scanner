import * as React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import tw from "../lib/tw"

interface PickUserItemProps {
  index: number
  item: any
  handlePressUser: (userId: string) => void
}

const PickUserItem = (props: PickUserItemProps) => {
  const user = props.item

  return (
    <TouchableOpacity onPress={() => props.handlePressUser(user.id)} style={tw`flex w-full p-3 bg-gray-100 border-gray-100 rounded-lg my-2 flex flex-row`}>
      <Image source={{ uri: user.avatar }} style={tw`w-14 h-14 rounded-full bg-gray-300`}/>
      <View style={tw`flex flex-1 justify-center self-center ml-3`}>
        <Text style={tw`text-base text-gray-800`}>{user.name}</Text>
        <Text style={tw`text-sm text-gray-500`}>{user.email}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PickUserItem