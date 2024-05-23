import { color } from '@/styles/color';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #f1f1f1;
`;

export const title = styled.Text``;

export const box = styled.View`
  background-color: ${color.focus.extr_light};
  padding: 15px;

  border-radius: 18px;
`

export const row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: ${color.focus.extr_light};
`

export const content = styled.View`
  gap: 20px;
`

export const line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #dfdfdf;
`