import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Card} from 'react-native-elements';
import tw from '../lib/tw';

const users = [
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
\\
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
  {
    time: '37 seconds ago',
    data: 'Data 123456',
    scanned: 'Data 123456',
  },
];

type CardsComponentsProps = {};

const Cards: React.FunctionComponent<CardsComponentsProps> = () => {
  return (
    <View style={tw`flex`}>
      <ScrollView>
        <View style={tw`flex`}>
          <Card>
            {users.map((u, i) => {
              return (
                <View
                  key={i}
                  style={tw`flex-col mb-3 pb-3 border-b border-gray-100 text-gray-800`}>
                  <Text style={tw`text-sm`}>{u.time}</Text>
                  <Text style={tw`text-xl font-bold`}>{u.data}</Text>
                  <Text style={tw`text-xl font-bold`}>{u.scanned}</Text>
                </View>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cards;
