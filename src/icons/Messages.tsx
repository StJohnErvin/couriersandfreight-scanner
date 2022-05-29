import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '../types/IconProps';

const Messages = (props: IconProps) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </Svg>
  );
};

export default Messages;
