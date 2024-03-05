import { useState } from "react";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import InputSearch from "@/components/elements/InputSearch";

export default function Search() {

  const [search, setSearch] = useState<string>("");

  return (
    <ViewAppLayout
      padding
      tabBarPadding
      dismissKeyboard>
      <InputSearch
        value={search}
        onChange={(e) => setSearch(e.nativeEvent.text)}
        clearFunction={() => setSearch("")}
      />
    </ViewAppLayout>
  );
}
