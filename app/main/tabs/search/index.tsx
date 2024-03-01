import { useState } from "react";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import InputLabel from "@/components/elements/InputLabel";

export default function Search() {

  const [search, setSearch] = useState<string>("");

  return (
    <ViewAppLayout
      padding
      tabBarPadding
      dismissKeyboard>
      <InputLabel
        value={search}
        placeholder="Search"
        isSearch
        onChange={(e) => setSearch(e.nativeEvent.text)}
        clearFunction={() => setSearch("")}
      />
    </ViewAppLayout>
  );
}
