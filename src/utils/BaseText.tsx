import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

type BaseTextProps = {
  variant?: 'regular' | 'extraLight' | 'light' | 'regular' | 'semiBold';
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

function BaseText(props: BaseTextProps) {
  const {style, variant = 'regular', children, ...restProps} = props;
  const defaultStyles = {
    fontFamily: `Nunito-${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
    color: '#000',
  };

  return (
    <Text
      {...restProps}
      style={Array.isArray(style) ? [defaultStyles, ...style] : [defaultStyles, style]}>
      {children}
    </Text>
  );
}

BaseText.defaultProps = {
  variant: 'regular',
  style: undefined,
};

export default BaseText;
