import React from 'react';;
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';;
import {BarCodeReadEvent} from 'react-native-camera';;
import QRCodeScanner from 'react-native-qrcode-scanner';;

import tw from '../lib/tw';;
import {ScannedItem} from '../types/ScannedItem';;
import {ScreenProps} from '../types/ScreenProps';;

interface ScanScreenProps extends ScreenProps {}

function ScanScreen(props: ScanScreenProps) {
  let [items, setItems] = React.useState<ScannedItem[]>([]);
  let [scanCount, setScanCount] = React.useState(0);
  let [scanRef, setScanRef] = React.useState<QRCodeScanner | null>(null);

  const handleOnRead = (e: BarCodeReadEvent) => {
    let itemAlreadyExists = items.find(i => i.code === e.data) != null;
    if (itemAlreadyExists) {
      Alert.alert('Already scanned', 'You have already scanned this item', [
        {
          text: 'Scan another item',
          onPress: () => scanRef?.reactivate(),
        },
        {
          text: `Set status for ${scanCount} ${
            scanCount != 1 ? 'items' : 'item'
          }`,
          onPress: () => handleContinue(),
        },
      ]);
      setTimeout(() => {}, 1000);;
      return;
    }

    setScanCount(() => scanCount + 1);
    let newItems = [
      ...items,
      {
        code: e.data,
        dateScanned: new Date().getTime(),
      },
    ];

    setItems(newItems);

    props.navigation.push('ScanResult', {
      itemCode: e.data,
      items: newItems,
    });

    setTimeout(() => {
      scanRef?.reactivate();
      console.log('reactivating scanner');
    }, 1000);
  };

  const handleContinue = () => {
    // push to set status
    props.navigation.push('SetStatus', {
      items,
    });

    // reactivate the scanner incase the user goes back
    scanRef?.reactivate();
  };

  const buttonActive = items.length > 0;

  return (
    <View style={tw`flex flex-col`}>
      {/* <View style={tw`mt-12 flex mx-3`}>
        <Text style={tw`text-2xl`}>Scan an item</Text>
        <Text>
          You have scanned {scanCount} {scanCount === 1 ? 'item' : 'items'}.
        </Text>
      </View>

      <QRCodeScanner
        containerStyle={{
          marginTop: 90,
          height: Dimensions.get('window').height,
        }}
        bottomViewStyle={{
          height: Dimensions.get('screen').height + 77,
          position: 'absolute',
          ...tw`w-full`,
        }}
        fadeIn={false}
        reactivate={false}
        showMarker={true}
        ref={node => setScanRef(node)}
        onRead={handleOnRead}
        bottomContent={
          <View
            style={tw.style({
              'w-full': true,
              'bg-blue-500': buttonActive,
              'bg-gray-400': !buttonActive,
            })}>
            <TouchableOpacity disabled={!buttonActive} onPress={handleContinue}>
              <Text
                style={{
                  ...tw`text-lg font-bold m-auto my-3`,
                  ...tw.style({
                    'text-white': buttonActive,
                    'text-gray-300': !buttonActive,,
                  }),,
                }}>
                Set status for {scanCount} {scanCount != 1 ? 'items' : 'item'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      /> */}
    </View>
  );
}

export default ScanScreen
