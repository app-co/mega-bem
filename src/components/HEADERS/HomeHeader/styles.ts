import { color } from '@/styles/color';
import { _text, hightPercent } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${color.focus.regular};
  height: ${hightPercent('14')}px;
  /* width: 100%; */

  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  padding-top: ${hightPercent('2')}px;

  align-items: center;
`;

export const title = styled.Text`
  color: #fff;
  font-family: bold;
  font-size: ${_text}px;
`;