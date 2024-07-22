import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _text, hightPercent } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const body = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const title = styled.Text``;

export const text = styled.Text`
  font-family: trin;
  color: ${color.text_color.global};
  text-align: center;
  font-size: ${_text}px;
`;

export const textBold = styled.Text`
  font-family: bold;
  color: ${color.text_color.global};
`;

export const content = styled.View`
  height: ${hightPercent('30')}px;
  padding: 20px;
  gap: 15px;
`;
