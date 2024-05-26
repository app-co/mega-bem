import { color } from "@/styles/color";
import { _title } from "@/styles/sizes";
import styled from "styled-components/native";


export const bar = styled.View`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  padding-bottom: 25px;
  background-color: #fff;
`

export const label = styled.Text<{ focused: boolean }>`
  color: ${h => h.focused ? color.focus.regular : color.focus.ligh};
  font-family: 'regular';
  font-size: ${_title - 9}px;
`

export const button = styled.TouchableOpacity<{ focused: boolean }>`
  align-items: center;
  gap: 7px;
  background-color: ${h => h.focused ? color.focus.extr_light : '#fff'};
  justify-content: center;
  padding: 8px 10px;
  border-radius: 18px;
`