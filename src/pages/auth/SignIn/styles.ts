import { _subtitle, _text } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
`

export const title = styled.Text`
  font-size: ${_subtitle + 2}px;
  font-family: 'bold';
`
export const text = styled.Text`
  font-size: ${_text}px;
  font-family: 'regular';
  color: #6B7280;
  `

export const body = styled.View`
  padding: 20px;
  flex: 1;
`

