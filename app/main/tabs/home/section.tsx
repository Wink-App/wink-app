import { View } from "react-native";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import ProductC from "@/components/product/ProductC";
import { VerticalScroll } from "@/components/wrappers/Scroll";
import { TextBig } from "@/utils/text/Text";

import { useHome } from "./_layout";

export default function Section() {

  const { selectedSection } = useHome();

  return (
    <ViewAppLayout>
      <TextBig>{selectedSection.name}</TextBig>
      <VerticalScroll
        numColumns={2}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}>
        {selectedSection.products.map((product) => (
          <ProductC key={product.id} product={product} />
        ))}
      </VerticalScroll>
    </ViewAppLayout>
  );
}