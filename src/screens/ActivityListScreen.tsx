/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

import type { ScreenProps } from '../types/ScreenProps';
import ActivityCard from '../components/ActivityListCard';
import HeaderNavigation from '../components/HeaderNavigation';

const ActivityListScreen = (props: ScreenProps) => {

  return (
    <View style={tw`flex mt-4`}>
      <HeaderNavigation light={false} />
      <View style={tw`flex mt-18`}>
        <ActivityCard />
      </View>
    </View>
  );
};

export default ActivityListScreen;
