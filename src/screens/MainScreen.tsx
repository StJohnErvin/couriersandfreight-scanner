import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/HomeScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ScanScreen from "../screens/ScanScreen"
import Home from "../icons/Home"
import QRCode from "../icons/QRCode"
import tw from "../lib/tw"
import { Text, View } from "react-native"
import Avatar from "../components/Avatar"

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const style = tw.style({
            'text-gray-400': !focused,
            'text-blue-600': focused,
            'mt-3': true
          })

          if (route.name === "Home") {
            return <Home style={style} />
          }

          if (route.name === "Scan") {
            return <QRCode style={style} />
          }

          if (route.name === "Profile") {
            return <View style={tw`mt-3`}><Avatar /></View>
          }

          return <></>
        },
        tabBarLabel: ({ focused }) => {
          const style = tw.style({
            'text-xs': true,
            'text-gray-400': !focused,
            'text-blue-600': focused,
            'mt-2': true,
            '-mb-3': true
          })
          return <Text style={style}>{route.name}</Text>
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigation