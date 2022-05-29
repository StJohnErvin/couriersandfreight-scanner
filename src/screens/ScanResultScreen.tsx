import * as React from "react"

import { View, Text, Dimensions, Button, TouchableOpacity } from "react-native"
import QRCode from "react-native-qrcode-svg"
import tw from "../lib/tw"
import { RootStackParamList } from "../types/Navigation"
import { ScreenProps } from "../types/ScreenProps"


interface ScanResultProps extends ScreenProps {
}

function ScanResult(props: ScanResultProps) {
  const [scanCount, setScanCount] = React.useState(props.route.params?.items?.length || 0)
  const params = props.route.params as RootStackParamList["ScanResult"]

  const handleScanAnother = () => {
    props.navigation.goBack()
  }

  const handleContinue = () => {
    props.navigation.replace('SetStatus', {
      ...params
    })
  }

  return (
    <View>
      <View style={tw`mt-12 flex mx-3`}>
        <Text style={tw`text-2xl`}>Scan result</Text>
        <View style={tw`flex-row`}>
        <Text>You have scanned {scanCount} {scanCount === 1 ? "item" : "items"}.</Text>
          <TouchableOpacity style={tw`ml-auto -mt-3`}>
            <Text style={tw`text-blue-500 text-lg`}>Edit items</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`mx-auto mt-12 bg-transparent`}>
        <QRCode
          value={params?.itemCode}
          backgroundColor="transparent"
          size={Dimensions.get('screen').width / 1.3}
        />
      </View>
      <Text style={tw`text-center text-4xl font-black mt-4 text-black font-mono`}>{params.itemCode}</Text>


      <View style={tw`w-full bg-blue-500 mt-6 mb-2`}>
        <TouchableOpacity onPress={handleScanAnother}>
          <Text style={tw`text-lg font-bold m-auto my-3 text-white`}>
            Scan another item
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`w-full bg-blue-500`}>
        <TouchableOpacity onPress={handleContinue}>
          <Text style={tw`text-lg font-bold m-auto my-3 text-white`}>
          Set status for {scanCount} {scanCount != 1 ? 'items' : 'item'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ScanResult