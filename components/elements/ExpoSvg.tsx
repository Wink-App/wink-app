import { Image, ImageSource, ImageStyle } from "expo-image";

type ExpoSvgProps = {
  source: ImageSource;
  style: ImageStyle;
};

export default function ExpoSvg({
  source,
  style,
}: ExpoSvgProps) {
  return <Image source={source} style={style} />;
}