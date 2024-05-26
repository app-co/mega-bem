import { Path, Svg } from "react-native-svg";

type T = {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}

export function WalletSvg({ width = 48, height = 48, fill = '#fff', viewBox = '0 0 48 48' }: T) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} fill="none">
      <Path d="M9 7.5C5.68629 7.5 3 10.1863 3 13.5V15H45V13.5C45 10.1863 42.3137 7.5 39 7.5H9Z" fill={fill} />
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M45 19.5H3V34.5C3 37.8137 5.68629 40.5 9 40.5H39C42.3137 40.5 45 37.8137 45 34.5V19.5ZM9 27C9 26.1716 9.67157 25.5 10.5 25.5H22.5C23.3284 25.5 24 26.1716 24 27C24 27.8284 23.3284 28.5 22.5 28.5H10.5C9.67157 28.5 9 27.8284 9 27ZM10.5 31.5C9.67157 31.5 9 32.1716 9 33C9 33.8284 9.67157 34.5 10.5 34.5H16.5C17.3284 34.5 18 33.8284 18 33C18 32.1716 17.3284 31.5 16.5 31.5H10.5Z" fill={fill} />
    </Svg>
  )
}