import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '../types/IconProps';

const Camera = (props: IconProps) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Svg>
  );
};

export default Camera;
