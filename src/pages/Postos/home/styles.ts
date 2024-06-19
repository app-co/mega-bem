import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';

export const Container = styled.View`
  padding: 15px;
  flex: 1;
  background-color: #fff;
`;

export const title = styled.Text``;

export const text = styled.Text`
  font-family: normal;
  color: ${color.text_color.dark};
  text-align: center;
  font-size: ${_text}px;
`;
