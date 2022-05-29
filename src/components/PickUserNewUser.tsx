import { useNavigation, useNavigationState } from "@react-navigation/native"
import * as React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';

import UserAdd from "../icons/UserAdd"
import tw from "../lib/tw"

const PickUserNewUser = () => {

  let navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handleNewUserLogin = () => {
    navigation.navigate('Login', {})
  }

  return (
    <TouchableOpacity onPress={handleNewUserLogin} style={tw`flex w-full p-3 bg-gray-100 border-gray-100 rounded-lg my-2 flex flex-row`}>
      <View style={tw`w-14 h-14 rounded-full border-gray-300 bg-gray-300`}>
        <UserAdd style={tw`w-6 h-6 m-auto text-gray-600 rounded-full`} />
      </View>
      <View style={tw`flex flex-1 justify-center self-center ml-3`}>
        <Text style={tw`text-base text-gray-800`}>I am not in the list</Text>
        <Text style={tw`text-sm text-gray-500`}>Login new user</Text>
      </View>
    </TouchableOpacity>
  )

}

export default PickUserNewUser