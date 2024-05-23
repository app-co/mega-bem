import { color } from '@/styles/color';
import { _subtitle, _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 15px;
  flex: 1;
`;

export const title = styled.Text`
  font-family: 'bold';
  font-size: ${_subtitle}px;
  color: ${color.text_color.global};

`;

export const text = styled.Text`
  font-family: 'trin';
  font-size: ${_text - 1}px;
  color: ${color.text_color.global};
  
`

export const share = styled.TouchableOpacity`
  background-color: ${color.focus.dark};
  height: 70px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  border-radius: 15px;
`