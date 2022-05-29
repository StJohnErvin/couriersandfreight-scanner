/* eslint-disable quotes */
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';
import tw from '../lib/tw';

interface HeaderNavigationProps {
  onPress?: () => void;
  text?: string;
  light?: boolean;
}

const HeaderNavigation = (props: HeaderNavigationProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const canGoBack = React.useMemo(() => navigation.canGoBack(), []);

  const handleBackPress = () => {
    if (props.onPress) {
      props.onPress();
      return;
    }

    navigation.goBack();
  };

  if (!canGoBack) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleBackPress}
        style={tw`absolute top-12 left-3 flex flex-row`}>
        <Text
          style={tw.style(
            `flex ml-1 text-lg text-gray-600`,
            props.light ? 'text-blue-500' : '',
          )}>
          {props.text || 'Back'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default HeaderNavigation;
