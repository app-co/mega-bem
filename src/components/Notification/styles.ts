import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { widtPercent } from '@/styles/sizes';

export const Container = styled.View`
  position: absolute;
  height: 100%;
  width: ${widtPercent('45')}px;
  background-color: #171717;
  padding: 20px;
  z-index: 100;
  right: 0;
  left: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const title = styled.Text`
  color: ${color.text_color.focus};
  margin-top: 20px;
`;
