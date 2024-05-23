import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const boxImag = styled.View`
  margin-top: -100px;
`

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
  margin: 15px 0;
  margin-top: 25px;

`

export const textStatus = styled.Text`
  font-size: ${_text - 4}px;
  font-family: 'semi_bold';
  color: #045310;
`

export const content = styled.View`
  flex: 1;
  border-radius: 30px;
  width: 100%;
  margin-top: -25px;
  background-color: #fff;
  padding: 0 20px;
`

export const body = styled.View`
  margin-top: 20px;
  gap: 10px;
`

export const line = styled.View`  
  width: 100%;
  height: 1px;

  background-color: #dfdfdf;
  margin: 20px 0;
`

export const textObos = styled.Text`
  font-family: 'trin';
  font-size: ${_text - 2};
  color: ${color.text_color.global};
`
