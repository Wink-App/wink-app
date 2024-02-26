import { View } from "react-native";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { HeaderBackElements } from "@/components/elements/HeaderBackElements";
import ProductC from "@/components/product/ProductC";
import { VerticalScroll } from "@/components/wrappers/Scroll";
import { TextBig } from "@/utils/text/Text";
import { windowWidth } from "@/utils/utils";

import { useHome } from "./_layout";

export default function Section() {

  const { selectedSection } = useHome();

  return (
    <ViewAppLayout
      padding
      tabBarPadding>
      <HeaderBackElements center>
        <TextBig>{selectedSection.name}</TextBig>
      </HeaderBackElements>
      <VerticalScroll
        numColumns={2}
        ItemSeparatorComponent={<View style={{ height: 25 }} />}
        contentContainerStyle={{
          width: windowWidth - 40,
          paddingBottom: 40,
        }}>
        {selectedSection.products.map((product) => (
          <ProductC key={product.id} product={product} view="Section" />
        ))}
      </VerticalScroll>
    </ViewAppLayout>
  );
}