import * as React from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import {Button, Card, Header, Icon} from 'react-native-elements';
import type {ScreenProps} from '../types/ScreenProps';

import HeaderNavigation from '../components/HeaderNavigation';

const Status = (props: ScreenProps) => {
  const createTwoButtonAlert = () =>
  Alert.alert('Alert Title', 'My Alert Msg', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Confirm', onPress: () => console.log('Confirm  Pressed')},
  ]);
  return (
    <>
      <Header
        placement="left"
        leftComponent={{color: '#fff'}}
        centerComponent={{style: {color: '#fff'}}}
        rightComponent={{color: '#fff'}}
      />
      <HeaderNavigation />
      <Text>Set Status</Text>
      <Text>View items</Text>
      <Button
        buttonStyle={{
          borderRadius: 50,
          marginTop: 10,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Received in"
        onPress={createTwoButtonAlert}
        // onPress={() => props.navigation.navigate('ActivityList')}
      />
      <Button
        buttonStyle={{
          borderRadius: 50,
          marginTop: 10,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Out - By location"
        // onPress={() => props.navigation.navigate('ActivityList')}
      />
      <Button
        buttonStyle={{
          borderRadius: 50,
          marginTop: 10,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Not Loaded"
        onPress={() => props.navigation.navigate('Alert')}
      />
      <Button
        buttonStyle={{
          borderRadius: 50,
          marginTop: 10,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Driver Returned"
        onPress={() => props.navigation.navigate('Alert')}
      />
      <Button
        buttonStyle={{
          borderRadius: 70,
          marginTop: 10,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Rearangement"
        onPress={() => props.navigation.navigate('Alert')}
      />
      <Button
        buttonStyle={{
          borderRadius: 70,
          marginTop: 10,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Return to DC"
        onPress={() => props.navigation.navigate('Alert')}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default Status;
