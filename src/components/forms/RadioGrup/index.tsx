import { color } from "@/styles/color"
import { Radio } from "native-base"

export type TRadios = { text: string, value: string }
interface I {
  radios: TRadios[]
  alin?: 'row' | 'column'
  name?: string
}
export function RadioGrup({ radios, name = 'my group', alin = 'column' }: I) {

  return (
    <Radio.Group name={name} defaultValue="0" direction={alin} space={2} >
      {radios.map(h => (
        <Radio _checked={{ borderColor: color.focus.regular, _icon: { color: color.focus.regular } }} colorScheme={'primary'} value={h.value} >{h.text}</Radio>
      ))}
    </Radio.Group>
  )
}