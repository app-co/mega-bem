import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _subtitle } from '@/styles/sizes';

export const Container = styled.View``;

export const title = styled.Text`
  font-family: 'bold';
  font-size: ${_subtitle - 1}px;
  color: ${color.text_color.global};
`;

export const text = styled.Text`
  font-family: trin;
  color: ${color.text_color.global};
  text-align: center;
`;

export const share = styled.TouchableOpacity`
  background-color: ${color.focus.dark};
  height: 70px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  border-radius: 15px;
`;
