import { color } from "@/styles/color";
import { hightPercent } from "@/styles/sizes";
import { Select } from "native-base";

export type TSelectionItem = { value: string, label: string }

interface I {
  itens: TSelectionItem[]
  itemSelected: (value: string) => void
}

export function Selection({ itens, itemSelected }: I) {
  return (
    <Select onValueChange={h => itemSelected(h)} _text={{ color: color.text_color.focus }} defaultValue="Selecione um item" rounded={'15px'} h={`${hightPercent('6')}px`} >
      {itens.map(h => (
        <Select.Item key={h.value} label={h.label} value={h.value} />
      ))}
    </Select>
  )
}