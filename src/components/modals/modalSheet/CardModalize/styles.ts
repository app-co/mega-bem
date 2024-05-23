import { color } from "@/styles/color";
import { _subtitle, _text, hightPercent } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  padding: 20px 20px;
`

export const title = styled.Text`
  font-family: 'bold';
  font-size: ${_subtitle}px;
  text-align: center;
  margin-bottom: 20px;
  color: ${color.text_color.global};

`


export const text = styled.Text`
  font-family: 'trin';
  font-size: ${_text - 3}px;
  margin-bottom: 8px;
  color: ${color.text_color.light};
`

export const textBold = styled.Text`
  font-family: 'bold';
  font-size: ${_text - 3}px;
  margin-bottom: 8px;
  color: ${color.text_color.light};
`

export const form = styled.View`
  gap: 15px;
  margin-top: 40px;
  height: ${hightPercent('4')}%;
  justify-content: space-between;
`