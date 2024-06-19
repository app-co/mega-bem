import { TextInput } from 'react-native';

import { css } from 'styled-components';
import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { _text, hightPercent } from '@/styles/sizes';

interface I {
  filed: boolean;
  focus: boolean;
  error: boolean;
}

export type TCondition = 'filed' | 'focus' | 'error';

export const Container = styled.View<I>`
  border-radius: 12px;
  flex-direction: row;
  width: 100%;
  height: ${hightPercent('6')}px;
  align-items: center;

  border-width: 1px;
  border-color: #b9b7b7;

  ${(h: I) =>
    h.filed &&
    css`
      border-color: ${color.focus.dark};
      border-width: 1px;
    `}
  ${(h: I) =>
    h.focus &&
    css`
      border-color: ${color.focus.regular};
      border-width: 1px;
    `};

  ${(h: I) =>
    h.error &&
    css`
      border-color: ${color.alert};
      border-width: 1px;
    `};
`;

export const title = styled.Text`
  color: ${color.text_color.global};
  font-family: trin;
  margin-bottom: 5px;
  font-size: ${_text - 2}px;
  position: absolute;
  top: ${hightPercent('-2')}%;
  left: 20px;
  background-color: #fff;
  z-index: 20;
  padding: 0 5px;
`;

export const input = styled(TextInput) <{ isFilled: boolean }>`
  flex: 1;
  padding: 0 0 0 10px;
  color: ${color.text_color.global};
  font-family: ${h => (h.isFilled ? 'regular' : 'italic')};
`;

export const boxIcon = styled.TouchableOpacity`
  width: 40px;
  height: 100%;

  align-items: center;
  justify-content: center;
`;
