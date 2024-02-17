import { FlatList } from "react-native";

type HorizontalScrollProps = {
  children: any[];
};

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  return (
    <FlatList
      horizontal
      data={children}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <>{item}</>}
    />
  );
}