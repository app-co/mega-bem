import { Path, Svg } from "react-native-svg";

interface I {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function WalletBarSvg({ fill = '#9CA3AF', width = 32, height = 28 }: I) {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 18" fill="none">
      <Path d="M1.41699 5.25H20.917M1.41699 6H20.917M4.41699 11.25H10.417M4.41699 13.5H7.41699M3.66699 16.5H18.667C19.9096 16.5 20.917 15.4926 20.917 14.25V3.75C20.917 2.50736 19.9096 1.5 18.667 1.5H3.66699C2.42435 1.5 1.41699 2.50736 1.41699 3.75V14.25C1.41699 15.4926 2.42435 16.5 3.66699 16.5Z" stroke={fill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}