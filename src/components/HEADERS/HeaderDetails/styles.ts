import { _text, hightPercent, widtPercent } from '@/styles/sizes';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: ${hightPercent('12')}px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  padding-top : ${Platform.OS === 'ios' ? 45 : 40}px ;
  align-items: center;
  background-color: #1e1e1e69;
`;

export const title = styled.Text`
  font-family: 'bold';
  color: #fff;
  text-align: center;
  margin-left: ${widtPercent('3')}%;
  font-size: ${_text}px;
`;