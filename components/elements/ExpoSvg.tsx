import { Image, ImageSource, ImageStyle } from "expo-image";

type ExpoSvgProps = {
  source: ImageSource;
  size?: number;
  style?: ImageStyle;
};

export default function ExpoSvg({
  source,
  size,
  style = {},
}: ExpoSvgProps) {
  const renderStyle = size ? { width: size, height: size, ...style } : style;
  return <Image source={source} style={renderStyle} />;
}