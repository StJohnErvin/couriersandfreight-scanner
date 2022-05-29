import * as React from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../lib/tw';
import type {ScreenProps} from '../types/ScreenProps';

import Logo from '../components/Logo';
import Panel from '../components/Panel';
import Heading from '../components/Heading';
import useUserStore from '../store/user';
import CodeInput from '../components/CodeInput';
import useAuthStore from '../store/auth';

enum CodeState {
  First = 'First',
  Second = 'Second',
  Complete = 'Complete',
  Error = 'Error',
}

const SetCodeScreen = (props: ScreenProps) => {
  const authStore = useAuthStore();

  const [codeState, setCodeState] = React.useState<CodeState>(CodeState.First);
  const [firstCode, setFirstCode] = React.useState<string>();
  const [secondCode, setSecondCode] = React.useState<string>();

  const handleCodeReset = () => {
    setFirstCode('');
    setSecondCode('');

    // set the state back to the first code
    setCodeState(CodeState.First);
  };

  const handleSetFirstCode = (code: string) => {
    setFirstCode(code);
    setCodeState(CodeState.Second);
  };

  const handleSetSecondCode = (code: string) => {
    setSecondCode(code);
    if (firstCode === code) {
      setCodeState(CodeState.Complete);

      // set the code in the authStore for this userId
      authStore.setCode(props.route.params?.userId, code);
    } else {
      setCodeState(CodeState.Error);
      setSecondCode('');
    }
  };

  const handleGetStarted = () => {
    props.navigation.push('Main');
  };

  return (
    <>
      <View style={tw`flex`}>
        <Logo height={100} style={tw`mt-24 mb-12`} />
        <View style={tw`absolute inset-0 bg-gray-800 opacity-50`}></View>

        <Panel>
          <>
            <Heading h1 style={tw`text-center mt-6`}>
              <Text style={tw`text-gray-300`}>
                {codeState === CodeState.First ? 'Enter code' : null}
                {codeState !== CodeState.First ? 'Reenter your code' : null}
              </Text>
            </Heading>

            <Text style={tw`text-lg text-center text-gray-600 my-4`}>
              {codeState === CodeState.First
                ? 'Set a code so that you can log in quickly next time.'
                : null}
              {codeState !== CodeState.First
                ? 'Re-enter your code to confirm that you entered it correctly.'
                : null}
            </Text>

            <View style={tw`mt-4 flex h-16`}>
              <View style={tw`flex-1 flex-row`}>
                {codeState === CodeState.First ? (
                  <CodeInput onChange={handleSetFirstCode} />
                ) : null}
                {codeState !== CodeState.First ? (
                  <CodeInput onChange={handleSetSecondCode} />
                ) : null}
              </View>
            </View>

            {codeState === CodeState.Error ? (
              <Text style={tw`mt-3 text-base text-red-500 text-center`}>
                Your codes do not match. Retry or start over.
              </Text>
            ) : null}

            {![CodeState.First, CodeState.Complete].includes(codeState) ? (
              <View style={tw`flex mt-4 mx-auto`}>
                <TouchableOpacity onPress={handleCodeReset}>
                  <Text style={tw`text-base text-blue-500`}>Start over</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {codeState === CodeState.Complete ? (
              <TouchableOpacity style={tw`mt-6`} onPress={handleGetStarted}>
                <View style={tw`w-full rounded-2xl bg-gray-800 p-4`}>
                  <Text
                    style={tw`text-white text-lg font-semibold text-center`}>
                    Get Started
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </>
        </Panel>
      </View>
    </>
  );
};

export default SetCodeScreen;
