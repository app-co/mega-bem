import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 20px;
`;

export const body = styled.View`  
  flex: 1;
  gap: 20px;
  margin-top: 30px;
`;
export const title = styled.Text`
  font-size: ${_text}px;
  font-family: bold;
  color: ${color.text_color.light};
  margin-top: 30px;
`;

export const boxAvatar = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #f2f2f2;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: dashed;
`