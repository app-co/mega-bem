import { color } from "@/styles/color";
import { _text } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  gap: 20px;
  margin-top: 30px;
`

export const textForgot = styled.Text`
  color: ${color.text_color.focus};
  font-size: ${_text - 3}px;
  text-align: right;
`