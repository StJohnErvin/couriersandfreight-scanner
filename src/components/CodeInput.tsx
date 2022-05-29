import * as React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import tw from '../lib/tw';

interface CodeInputProps {
  onChange?: (code: string) => void;
  secure?: boolean;
}

const CodeInput = (props: CodeInputProps) => {
  const [code, setCode] = React.useState<string[]>([]);

  const refs = React.useMemo(() => [
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
  ], []);

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const key = e.nativeEvent.key;
    const newCode = [...code];

    if (key === 'Backspace') {
      newCode[index] = '';

      if (index === 1) {
        refs[0].current?.focus();
      } else if (index === 2) {
        refs[1].current?.focus();
      } else if (index === 3) {
        refs[2].current?.focus();
      }
    } else {
      newCode[index] = key;

      if (index === 0) {
        refs[1].current?.focus();
      } else if (index === 1) {
        refs[2].current?.focus();
      } else if (index === 2) {
        refs[3].current?.focus();
      } else if (index === 3) {
        // fire onChange event
        if (props.onChange) {
          props.onChange(newCode.join(''));
        }
      }
    }

    setCode(newCode);
  };

  return (
    <View style={tw`flex-1 flex-row`}>
      {[0, 1, 2, 3].map(index => (
        <View
          key={`codeInput_${index}`}
          style={tw`flex-1 justify-center items-center bg-white border-gray-400 border rounded-2 border mx-1 py-8`}>
          <TextInput
            value={code[index]}
            ref={refs[index]}
            style={tw`w-auto h-10 w-10 text-center`}
            // todo detect android for keyboard type.
            // keyboardType="numeric"
            underlineColorAndroid={'transparent'}
            autoFocus={index === 0 ? true : false}
            maxLength={1}
            onKeyPress={e => handleKeyPress(index, e)}
            secureTextEntry={props.secure || false}
          />
        </View>
      ))}
    </View>
  );
};

export default CodeInput;
