import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from "react-native";

type ScrollProps = {
  children: any[];
  pagingEnabled?: boolean;
  numColumns?: number;
  ListEmptyComponent?: JSX.Element;
  ItemSeparatorComponent?: JSX.Element | any;
  columnWrapperStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export function HorizontalScroll({
  children,
  pagingEnabled = false,
  ListEmptyComponent = null,
  ItemSeparatorComponent = null,
  contentContainerStyle = {},
  onScroll,
}: ScrollProps) {
  return (
    <FlatList
      horizontal
      data={children}
      pagingEnabled={pagingEnabled}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={contentContainerStyle}
      onScroll={onScroll}
      renderItem={({ item }) => item}
    />
  );
}

export function VerticalScroll({
  children,
  numColumns = 1,
  ListEmptyComponent = null,
  ItemSeparatorComponent = null,
  columnWrapperStyle = { justifyContent: "space-between" },
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
      columnWrapperStyle={columnWrapperStyle}
      contentContainerStyle={contentContainerStyle}
      onScroll={onScroll}
      renderItem={({ item }) => item}
    />
  );
}