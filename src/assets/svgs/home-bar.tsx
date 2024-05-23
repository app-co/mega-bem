import { Path, Svg } from "react-native-svg";

interface I {
  fill: string
}

export function HomeBarSvg({ fill = '#9CA3AF' }: I) {
  return (
    <Svg width="25" height="25" viewBox="0 0 23 21" fill="none">
      <Path d="M1.75 11L10.7045 2.04545C11.1438 1.60611 11.8562 1.60611 12.2955 2.04545L21.25 11M4 8.74995V18.875C4 19.4963 4.50368 20 5.125 20H9.25V15.125C9.25 14.5036 9.75368 14 10.375 14H12.625C13.2463 14 13.75 14.5036 13.75 15.125V20H17.875C18.4963 20 19 19.4963 19 18.875V8.74995M7.75 20H16" stroke={fill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  )
}