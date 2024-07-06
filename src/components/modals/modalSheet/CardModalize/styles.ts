import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _subtitle, _text, _title, hightPercent } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 50px;
  background-color: #fff;
`;

export const body = styled.View`
  flex: 1;
  padding: 20px;
`;

export const title = styled.Text`
  font-family: bold;
  font-size: ${_subtitle}px;
`;

export const text = styled.Text`
  font-family: trin;
  font-size: ${_text}px;
`;

export const textBold = styled.Text`
  font-family: bold;
`;

export const card = styled(LinearGradient)`
  background-color: ${color.focus.regular};
  align-items: center;
  justify-content: center;
  margin-top: ${hightPercent('3')}%;
  border-radius: 20px;
  padding: 20px;
`;
export const cod = styled.Text`
  font-family: bold;
  font-size: ${_title + 25}px;
  color: #fff;
  margin-bottom: -15px;
`;
