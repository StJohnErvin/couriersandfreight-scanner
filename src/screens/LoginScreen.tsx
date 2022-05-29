import * as React from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import tw from "../lib/tw"
import supabase from "../lib/supabase"
import type { ScreenProps } from "../types/ScreenProps"

import Logo from "../components/Logo"
import Panel from "../components/Panel"
import Heading from "../components/Heading"
import UserCircle from "../icons/UserCircle"
import Loading from "../components/Loading"
import useUserStore from "../store/user"
import Key from "../icons/Key"
import HeaderNavigation from "../components/HeaderNavigation"
import useAuthStore from "../store/auth"

enum LoginState {
  Idle = "Idle",
  Loading = "Loading",
  Error = "Error"
}

const LoginScreen = (props: ScreenProps) => {

  const userStore = useUserStore()
  const authStore = useAuthStore()
  const [loginState, setLoginState] = React.useState<LoginState>(LoginState.Idle)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleOnLogin = async () => {
    setLoginState(LoginState.Loading)

    // get the session
    const session = await supabase.auth.signIn({ email: 'johnervin.ceriola@outlook.com', password:'password1' })

    // test if the user is valid
    if (session.error) {
      setLoginState(LoginState.Error)
      return
    }

    // get the users profile
    let profile = await supabase
      .from('profiles')
      .select('*')
      .match({ id: session.user?.id })
      .single()

    const id = session.user?.id
    const name = `${profile.data.first_name} ${profile.data.last_name}`
    const email = profile.data.email
    const avatar = profile.data.avatar_url
    const last_login_date = new Date()
    const access_token = session.session?.access_token
    const refresh_token = session.session?.refresh_token
    const expires_at = Math.floor(new Date().getTime() / 1000) + (session.session?.expires_in || 0)

    // store the user in usersStore
    const existingUsers = userStore.users.filter(u => u.id !== id)
    userStore.setUsers([
      ...existingUsers,
      {
        id,
        name,
        email,
        avatar,
        last_login_date
      }
    ])

    // store the access_token, refresh_token and expires_in in the authStore
    authStore.setTokens(id!, { access_token, refresh_token, expires_at })
    userStore.setCurrentUser(id!, access_token!)
    props.navigation.replace('SetCode', { userId: id })
  }

  return (
    <>
      <View style={tw`flex`}>
        <HeaderNavigation text="Pick a user" />

        <Logo height={100} style={tw`mt-24 mb-12`} />
        
        <Panel>
          <>
            <Heading h1>Login</Heading>

            <View style={tw`mt-6`}>
              <Heading style={tw`mb-1`}>Username</Heading>
              <View style={tw`flex-1 flex-row justify-center items-center bg-white border-gray-200 border rounded-2 border-2 py-6`}>
                <UserCircle style={tw`ml-3 w-5 h-5 text-gray-500`} />
                <TextInput onChangeText={(e) => setUsername(e)} style={tw`flex-1 pr-4 pr-4 pl-2 h-10`} placeholder="Username" autoCapitalize="none" underlineColorAndroid={"transparent"} />
              </View>
            </View>

            <View style={tw`mt-3`}>
              <Heading style={tw`mb-1`}>Password</Heading>
              <View style={tw`flex-1 flex-row justify-center items-center bg-white border-gray-200 border rounded-2 border-2 py-6`}>
                <Key style={tw`ml-3 w-5 h-5 text-gray-500`} />
                <TextInput onChangeText={(e) => setPassword(e)} style={tw`flex-1 pr-4 pr-4 pl-2 h-10`} placeholder="Password" secureTextEntry={true} autoCapitalize="none" underlineColorAndroid={"transparent"} />
              </View>
            </View>

            <TouchableOpacity style={tw`mt-6`} onPress={handleOnLogin}>
              <View style={tw`w-full rounded-2xl bg-gray-800 p-4`}>
                {loginState !== LoginState.Loading ? <Text style={tw`text-white text-lg font-semibold text-center`}>Login</Text> : null}
                {loginState === LoginState.Loading ? <Loading style={tw`text-green-500 w-7 h-7 mx-auto`} /> : null}
              </View>
            </TouchableOpacity>

            {loginState === LoginState.Error ? <Text style={tw`mt-3 text-base text-center text-red-600`}>Incorrect username or password</Text> : null}
          </>
        </Panel>
      </View>
    </>
  )
}

export default LoginScreen