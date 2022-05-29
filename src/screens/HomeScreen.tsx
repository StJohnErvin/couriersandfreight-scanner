/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import tw from 'twrnc';
import {Button, Card, Header} from 'react-native-elements';
import SearchBar from '../components/SearchBar';
import type {ScreenProps} from '../types/ScreenProps';
import Activity from '../icons/Activity';
import Camera from '../icons/Camera';
import Report from '../icons/Report';
import Clock from '../icons/Clock';
import Messages from '../icons/Messages';

const HomeScreen = (props: ScreenProps) => {
  const handleOnRead = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <Header
        placement="left"
        leftComponent={{color: '#fff'}}
        centerComponent={{text: 'Flexi Scanner', style: {color: '#fff'}}}
        rightComponent={{color: '#fff'}}
      />
      <SearchBar />
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 3}}>
          <Card>
            <Activity
              style={tw`mt-0 text-base text-center text-blue-500 h-15`}
            />
            <View style={tw`mt-3`} />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Activity"
              onPress={() => props.navigation.navigate('ActivityList')}
            />
          </Card>
        </View>
        <View style={{flex: 0}} />
        <View style={{flex: 3}}>
          <Card>
            <Camera style={tw`mt-0 text-base text-center text-blue-500 h-15`} />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Scanner"
              onPress={() => props.navigation.navigate('Scan')}
            />
          </Card>
        </View>
      </View>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 3}}>
          <Card>
            <Report style={tw`mt-0 text-base text-center text-blue-600 h-15`} />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Report"
            />
          </Card>
        </View>
        <View style={{flex: 0}} />
        <View style={{flex: 3}}>
          <Card>
            <Clock style={tw`mt-0 text-base text-center text-blue-600 h-15`} />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Clock"
            />
          </Card>
        </View>
      </View>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 3}}>
          <Card>
            <Messages
              style={tw`mt-0 text-base text-center text-blue-600 h-15`}
            />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Message"
            />
          </Card>
        </View>
        <View style={{flex: 0}} />
        <View style={{flex: 3}}>
          <Card>
            <Clock style={tw`mt-0 text-base text-center text-blue-600 h-15`} />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Clock"
            />
          </Card>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;
