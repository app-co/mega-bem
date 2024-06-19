import { color } from "@/styles/color";
import { _subtitle, _text, hightPercent } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  padding: 20px 20px;
  padding-bottom: 100px;
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
  font-size: ${_text - 3}px;
  margin-bottom: 8px;
  color: ${color.text_color.light};
  
`

export const form = styled.View`
  gap: 15px;
  margin-top: 20px;
  height: ${hightPercent('4')}%;
`