import { color } from "@/styles/color";
import { _subtitle, _text } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  padding-top: 30px;
`

export const title = styled.Text`
  font-family: 'bold';
  font-size: ${_subtitle}px;
  text-align: center;
  margin-bottom: 20px;
  color: ${color.text_color.global};

`


export const text = styled.Text`
  font-family: 'regular';
  font-size: ${_text}px;
  margin-bottom: 8px;
  color: ${color.text_color.global};
  
`

export const form = styled.View`
  gap: 15px;
`