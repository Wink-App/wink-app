import { Product, products1, products2, products3 } from "./product.type";

export type Section = {
  id: string;
  name: string;
  products: Product[];
};

export const sections: Section[] = [
  {
    id: "1",
    name: "Esplora le novità",
    products: [...products1, ...products2],
  },
  {
    id: "2",
    name: "Saldi",
    products: products2,
  },
  {
    id: "3",
    name: "Scarpe",
    products: products3,
  },
];