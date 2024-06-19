import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _subtitle, _title, hightPercent } from '@/styles/sizes';

export const Container = styled.View`
  padding: 15px;
  flex: 1;
  background-color: #fff;
`;

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

export const textBold = styled.Text`
  font-family: bold;
  color: ${color.text_color.global};
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

export const card = styled(LinearGradient)`
  background-color: ${color.focus.regular};
  align-items: center;
  justify-content: center;
  /* margin-top: ${hightPercent('1')}%; */
  border-radius: 20px;
  padding: 20px;
`;
export const cod = styled.Text`
  font-family: bold;
  font-size: ${_title + 25}px;
  color: #fff;
  margin-bottom: -15px;
`;
