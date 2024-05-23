import { color } from "@/styles/color";
import { hightPercent } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  flex: 1;
  background-color: #ffff;
`

export const title = styled.Text`
  color: ${color.text_color.global}
`

export const boxAvatr = styled.View`
  border-radius: 20px;
  border-width: 1px;
  border-style: dashed;
  background-color: #f2f2f2;
  border-color: #9e9e9e;
  height: 85px;
  width: 85px;

  margin: 0 auto;
  align-items: center;
  justify-content: center;
`

export const form = styled.View`
  gap: 18px;
  margin-top: ${hightPercent('1')}%;
`

export const line = styled.View`
  height: 1px;
  background-color: #dfdfdf;
`