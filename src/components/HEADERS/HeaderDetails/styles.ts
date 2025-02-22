import { Platform } from 'react-native';

import styled from 'styled-components/native';

import { _text, hightPercent, widtPercent } from '@/styles/sizes';

export const Container = styled.View`
  height: ${hightPercent('10')}px;
  display: flex;
  flex-direction: row;
  padding: 15px;
  padding-top: ${Platform.OS === 'ios' ? 25 : 40}px;
  padding-bottom: 2px;
  align-items: center;
  background-color: #1e1e1e69;
  z-index: 100;
`;

export const title = styled.Text`
  font-family: 'bold';
  color: #fff;
  text-align: center;
  margin-left: ${widtPercent('2.5')}%;
  font-size: ${_text}px;
  text-align: center;
`;
