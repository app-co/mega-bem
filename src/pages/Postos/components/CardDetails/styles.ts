import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';

export const Container = styled.TouchableOpacity`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #dfdede;
  margin-bottom: 10px;
`;

export const title = styled.Text`
  font-family: 'bold';
  color: ${color.text_color.global};
`;
export const text = styled.Text`
  font-size: ${_text - 4}px;
  font-family: 'regular';
`;

export const header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const textStatus = styled.Text`
  font-size: ${_text - 4}px;
  font-family: 'semi_bold';
  color: #045310;
`;

export const body = styled.View`
  margin-top: 20px;
  gap: 10px;
`;
