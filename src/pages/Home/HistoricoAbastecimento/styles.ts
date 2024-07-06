import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _subtitle, _text } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const title = styled.Text`
  font-size: ${_subtitle - 3}px;
  font-family: 'bold';
`;

export const subTitle = styled.Text`
  font-size: ${_text - 1}px;
  font-family: 'bold';
`;

export const input = styled.TextInput`
  background-color: #cdcdcd;
  height: 40px;
  border-radius: 20px;
  padding: 0 20px;
`;

export const row = styled.View`
  flex-direction: row;
  gap: 10px;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

export const boxFilter = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 5px 20px;

  border-width: 1px;
  border-color: ${color.focus.ligh};
  border-radius: 18px;
  background-color: ${h => (h.selected ? color.focus.regular : '#fff')};
`;

export const textSelect = styled.Text<{ selected: boolean }>`
  font-size: ${_text - 2}px;
  color: ${h => (h.selected ? '#ffffff' : color.focus.ligh)};
  font-family: 'regular';
`;
