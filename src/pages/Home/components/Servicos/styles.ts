import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  background-color: #fff;
`;

export const title = styled.Text`
  color: #fff;
  font-family: 'simi_bold';
  font-size: ${_text}px;
`;

export const abastecer = styled.TouchableOpacity`
  padding: 20px 15px;
  flex-direction: row;
  background-color: ${color.focus.regular};
  border-radius: 15px;
  align-items: center;
`

export const box = styled.TouchableOpacity<({ cor: 'border' | 'fill' }) >`
  padding: 20px 15px;
  flex-direction: row;
  border-radius: 15px;
  align-items: center;
  margin-top: 12px;

  ${h => h.cor === 'border' && css`
    border-color: ${color.focus.dark};
    border-width: 1.5px;
  `}

  ${h => h.cor === 'fill' && css`
    background-color: ${color.focus.dark};
  `};
`

export const textServico = styled.Text<({ cor: 'border' | 'fill' }) >`
  font-family: 'bold';
  font-size: ${_text - 1}px;
  ${h => h.cor === 'border' && css`
    color: ${color.focus.dark};

  `}

  ${h => h.cor === 'fill' && css`
    color: #fff;
  `};
`