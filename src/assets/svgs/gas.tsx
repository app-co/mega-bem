import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface I {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function GasSvg({ width = 52, height = 53, fill = '#a0a0a0' }: I) {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 33" fill="none" >
      <G clip-path="url(#clip0_256_3339)">
        <Path d="M11.5 17.5H10.5C9.70435 17.5 8.94129 17.8161 8.37868 18.3787C7.81607 18.9413 7.5 19.7044 7.5 20.5V27.5C7.5 28.2957 7.18393 29.0587 6.62132 29.6214C6.05871 30.184 5.29565 30.5 4.5 30.5C3.70435 30.5 2.94129 30.184 2.37868 29.6214C1.81607 29.0587 1.5 28.2957 1.5 27.5V10.5L5.5 6.50003" stroke={fill} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M1.5 10.5L5.5 14.5V16.5H1.5" stroke={fill} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M20.5 17.5001H24.5V24.5001H20.5V17.5001Z" stroke={fill} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M11.5009 31.5V3.50003C11.5009 2.9696 11.7116 2.46089 12.0866 2.08582C12.4617 1.71074 12.9704 1.50003 13.5009 1.50003H26.5009C27.0313 1.50003 27.54 1.71074 27.9151 2.08582C28.2901 2.46089 28.5009 2.9696 28.5009 3.50003V31.5H11.5009ZM9.50085 31.5H30.5009H9.50085ZM11.5009 13.5H28.5009H11.5009Z" stroke={fill} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_256_3339">
          <Rect width="32" height="32" fill={fill} transform="translate(0 0.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}