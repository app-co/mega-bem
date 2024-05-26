import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  gap: 15px;
  margin-top: 20px;
`;

export const title = styled.Text`
  font-size: ${_text - 1}px;
  font-family: 'bold';
`;
export const text = styled.Text`
  font-size: ${_text - 1}px;
  font-family: 'trin';
`;

export const row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const boxInfo = styled.View`
background-color: #eeeeee;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 10px;
`

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #dfdfdf;
`