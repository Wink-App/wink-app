import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from "react-native";

type ScrollProps = {
  children: any[];
  pagingEnabled?: boolean;
  numColumns?: number;
  ItemSeparatorComponent?: JSX.Element | any;
  ListEmptyComponent?: JSX.Element;
  contentContainerStyle?: ViewStyle;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export function HorizontalScroll({
  children,
  pagingEnabled = false,
  ItemSeparatorComponent = null,
  ListEmptyComponent = null,
  contentContainerStyle = {},
  onScroll,
}: ScrollProps) {
  return (
    <FlatList
      horizontal
      data={children}
      pagingEnabled={pagingEnabled}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={contentContainerStyle}
      onScroll={onScroll}
      renderItem={({ item }) => item}
    />
  );
}

export function VerticalScroll({
  children,
  numColumns = 1,
  ItemSeparatorComponent = null,
  ListEmptyComponent = null,
  contentContainerStyle = {},
  onScroll,
}: ScrollProps) {
  return (
    <FlatList
      numColumns={numColumns}
      data={children}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={contentContainerStyle}
      onScroll={onScroll}
      renderItem={({ item }) => item}
    />
  );
}