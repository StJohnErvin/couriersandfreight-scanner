import * as React from "react"
import { FlatList, View } from "react-native"
import Heading from "../components/Heading"
import Logo from "../components/Logo"
import Panel from "../components/Panel"
import PickUserItem from "../components/PickUserItem"
import PickUserNewUser from "../components/PickUserNewUser"
import tw from "../lib/tw"
import useUserStore from "../store/user"

import type { ScreenProps } from "../types/ScreenProps"

const PickUserScreen = (props: ScreenProps) => {

  const userStore = useUserStore()

  React.useEffect(() => {
    if (userStore.users.length === 0) {
      props.navigation.replace('Login')
    }
  }, [])

  const handlePressUser = (userId: string) => {
    console.log(`handlePressUser`, userId)
    props.navigation.push('EnterCode', { userId })
  }

  return (
    <>
      <View style={tw`flex`}>
        <Logo height={100} style={tw`mt-24 mb-12`} />
        
        <Panel>
          <>
            <Heading h1>Pick user</Heading>
            <View style={tw`flex flex-col flex-grow`}>
              <FlatList 
                ListHeaderComponent={PickUserNewUser} 
                data={userStore.users} 
                renderItem={(props) => <PickUserItem {...props} handlePressUser={handlePressUser} />} 
                keyExtractor={user => user.id} 
              />
            </View>
          </>
        </Panel>
      </View>
    </>
  )
}

export default PickUserScreen

