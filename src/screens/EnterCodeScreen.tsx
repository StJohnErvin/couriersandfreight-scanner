import * as React from "react"
import { DeviceEventEmitter, Image, NativeSyntheticEvent, Text, TextInput, TextInputKeyPressEventData, Touchable, TouchableOpacity, View } from "react-native"
import tw from "../lib/tw"
import type { ScreenProps } from "../types/ScreenProps"

import Logo from "../components/Logo"
import Panel from "../components/Panel"
import Heading from "../components/Heading"
import useUserStore from "../store/user"
import CodeInput from "../components/CodeInput"
import HeaderNavigation from "../components/HeaderNavigation"
import useAuthStore, { ErrorIncorrectUserCode, ErrorUserNotFound } from "../store/auth"
import { useNavigation } from "@react-navigation/native"
import type { RootStackParamList } from "../types/Navigation"
import supabase from "../lib/supabase"
import type { StackNavigationProp } from "@react-navigation/stack"

enum CodeState {
  First = "First",
  Second = "Second",
  Complete = "Complete",
  Error = "Error"
}

const EnterCodeScreen = (props: ScreenProps) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const user = userStore.users.find(u => u.id === props.route.params?.userId)
  const [error, setError] = React.useState('')
  
  const refreshToken = async (userId: string, token: string) => {
    const now = Math.floor(new Date().getTime() / 1000)

    const result = await supabase.auth.api.refreshAccessToken(token)
    const access_token = result.data?.access_token
    const refresh_token = result.data?.refresh_token
    const expires_at = now + (result.data?.expires_in || 0)
    const authState = useAuthStore.getState()
    const userState = useUserStore.getState()
    authState.setTokens(props.route.params?.userId, { access_token, refresh_token, expires_at })
    userStore.setCurrentUser(props.route.params?.userId, access_token!)
    console.log(`AUTH: refreshed token.`)
    refreshTokenBeforeItExpires(userId, refresh_token!)
  }

  // refresh token every 55 minutes
  const refreshTokenBeforeItExpires = (userId: string, refresh_token: string) => {
    setTimeout(() => {
      console.log(`AUTH: refreshing token now`)
      refreshToken(userId, refresh_token)
    }, 3300 * 1000)
  }

  const handleVerifyCode = async (code: string) => {
    console.log('test')
    try {
      let res = await authStore.loadUser(props.route.params?.userId, code)
      console.log(res)
      // handle expires_at
      const now = Math.floor(new Date().getTime() / 1000)
      const diff = (res.tokens?.expires_at || 0) - now

      // if there is less than 300 seconds remaining - renew the token
      if (diff < 300) {
        console.log(`refreshing the token as there is ${diff} seconds remaining.`)
        refreshToken(props.route.params?.userId, res.tokens?.refresh_token!)
      }
      else {
        console.log(`not refreshing the token yet, there is ${diff} seconds remaining.`)
        refreshTokenBeforeItExpires(props.route.params?.userId, res.tokens?.refresh_token!)
      }
      
      userStore.setCurrentUser(props.route.params?.userId, res.tokens?.access_token!)
      navigation.replace('Main')
    } catch (err) {
      console.log('error here', err)
      if (err instanceof ErrorIncorrectUserCode) {
        setError('Incorrect code entered.')
        setTimeout(() => {
          navigation.pop()
        }, 500)
      }
      if (err instanceof ErrorUserNotFound){
        userStore.clearCurrentUser()
      }
    }
  }

  return (
    <>
      <View style={tw`flex`}>
        <View style={tw`mt-30`}></View>
        <View style={tw`absolute inset-0 bg-gray-800 opacity-50`}></View>
        <View style={tw`z-10 absolute`}>
          <HeaderNavigation text="Pick a user" light />
        </View>
        
        <Panel>
          <>
            <View style={tw`w-24 h-24 border-gray-300 bg-gray-300 rounded-full mx-auto overflow-hidden`}>
              <Image source={{ uri: user.avatar }} style={tw`w-24 h-24 m-auto`} />
            </View>

            <Heading h1 style={tw`text-center mt-6`}>
              <Text style={tw`text-gray-300`}>
                Enter code
              </Text>
            </Heading>

            <Text style={tw`text-lg text-center text-gray-600 my-4`}>
              Enter your code to verify that it is actually you.
            </Text>

            <View style={tw`mt-4 flex h-16`}>
              <View style={tw`flex-1 flex-row`}>
                <CodeInput onChange={handleVerifyCode} secure />
              </View>
            </View>

            {error != null && <Text style={tw`text-center mt-3 text-lg text-red-500`}>{error}</Text>}
          </>
        </Panel>
      </View>
    </>
  )
}

export default EnterCodeScreen