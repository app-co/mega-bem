import { _text, _title, hightPercent, widtPercent } from "@/styles/sizes";
import styled, { css } from "styled-components/native";

interface I {
  selected?: boolean
}


export const container = styled.View`
  width: 100%;
  margin-top: 50px;
  /* height: ${hightPercent('80')}px; */
`

export const title = styled.Text`
  font-size: ${_title}px;
  font-family: 'bold';
`

export const text = styled.Text<I>`
  font-size: ${_text}px;
  font-family: ${h => h.selected ? 'bold' : 'regular'};
  color: ${h => h.selected ? '#000' : '#6B7280'};
`

export const body = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  /* min-height: ${hightPercent('2÷0')}px; */
  
  padding: 30px 20px;

  background-color: #fff;
  border-radius: 30px;
`

export const button = styled.TouchableOpacity.attrs({

})``

export const box = styled.View<I>`
  background-color: #fff;

  width: ${widtPercent('20')}px;
  align-items: center;
  justify-content: center;
  padding: 20px;

  border-radius: 15px;

  
  ${h => h.selected && css`
    border-width: 2px;
    border-color: #6B7280;
  `}
`

export const content = styled.View`
  gap: 10px;

`

export const boxForm = styled.View`
`