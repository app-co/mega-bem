import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

type status = 0 | 1 | 2

interface IStatus {
  status: status;
}

const statusColor: any = {
  1: color.focus.extr_light,
  2: '#ff7f7f',
  0: '#C4EFDA',
}

const statusTextColor: any = {
  1: color.focus.regular,
  2: '#823131',
  0: '#00421f',
}

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const title = styled.Text`
  color: ${color.text_color.global};
  font-size: ${_text + 1}px;
  font-family: bold;
`;

export const text = styled.Text`
  color: ${color.text_color.global};
  font-size: ${_text - 1}px;
  font-family: regular
`;

export const boxInput = styled.View`
  flex-direction: row;
background-color: #E5E7EB;
height: 40px;
border-radius: 20px;
padding: 0 20px;

align-items: center;
justify-content: center;
`
export const input = styled.TextInput`
  flex: 1;
  padding-left: 20px;
`

export const row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const status = styled.View<IStatus>`
  background-color: ${h => statusColor[h.status]};
  padding: 8px 15px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;

  flex-direction: row;
  gap: 8px
`

export const textStatus = styled.Text<IStatus>`
  color: ${h => statusTextColor[h.status]};
  font-family: 'semi_bold';
`

export const line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #dfdfdf;
`