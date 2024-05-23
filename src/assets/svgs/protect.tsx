import Svg, { Path } from "react-native-svg";

interface I {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  strong?: string;
}
export function ProtectSvg({ width = 18, height = 18, fill = '#6B7280', strong = 'none' }: I) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill={strong}>
      <Path d="M6.5 9.62483L8.375 11.4998L11.5 7.12483M9 1.26172C7.20792 2.9589 4.78802 3.99984 2.125 3.99984C2.08269 3.99984 2.04043 3.99958 1.99825 3.99906C1.67491 4.98248 1.5 6.03325 1.5 7.12488C1.5 11.7845 4.68693 15.6997 9 16.8098C13.3131 15.6997 16.5 11.7845 16.5 7.12488C16.5 6.03325 16.3251 4.98248 16.0018 3.99906C15.9596 3.99958 15.9173 3.99984 15.875 3.99984C13.212 3.99984 10.7921 2.9589 9 1.26172Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}