import { GasSvg } from "@/assets/svgs/gas"
import { HomeBarSvg } from "@/assets/svgs/home-bar"
import { WalletBarSvg } from "@/assets/svgs/wallet-bar"
import { color } from "@/styles/color"
import { FontAwesome } from "@expo/vector-icons"
import { Box } from "native-base"

interface I {
  isFocused: boolean,
  index: number,
}
export function Icons({ isFocused, index }: I) {
  const iconBar: any = {
    0: <HomeBarSvg fill={isFocused ? color.focus.regular : color.focus.ligh} />,
    1: <GasSvg width={28} fill={isFocused ? color.focus.regular : color.focus.ligh} />,
    2: <WalletBarSvg width={28} fill={isFocused ? color.focus.regular : color.focus.ligh} />,
    3: <FontAwesome name='gear' size={28} color={isFocused ? color.focus.regular : color.focus.ligh} />
  }

  return (
    <Box>
      {iconBar[index]}
    </Box>
  )
}