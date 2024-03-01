// TODO: Redefine this temporary Product type

export type Product = {
  id: string;
  name: string;
  price: number;
  sizes?: string[];
  category: string;
  image: string;
  time: string;
  storeName: string;
};

export const products1: Product[] = [
  {
    id: "1",
    name: "Nike Tech Fleece",
    price: 110,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Felpe",
    image: "https://i8.amplience.net/i/jpl/jd_668346_a?qlt=92&w=600&h=765&v=1&fmt=auto",
    time: "30 min",
    storeName: "Nike",
  },
  {
    id: "2",
    name: "Adidas Superstar",
    price: 90,
    category: "Scarpe",
    image: "https://i.ebayimg.com/images/g/sCwAAOSw7HFkicXr/s-l1200.webp",
    time: "30 min",
    storeName: "Adidas",
  },
  {
    id: "3",
    name: "Vans Old Skool",
    price: 80,
    category: "Scarpe",
    image: "https://images.vans.com/is/image/VansEU/VN0005UB1KP-HERO?$PDP-FULL-IMAGE$",
    time: "30 min",
    storeName: "Vans",
  },
];

export const products2: Product[] = [
  {
    id: "4",
    name: "Converse Chuck",
    price: 70,
    category: "Scarpe",
    image: "https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog-we/default/dw3618b251/images/l_08/162054C_L_08X1.jpg?sw=406",
    time: "30 min",
    storeName: "Converse",
  },
  {
    id: "5",
    name: "Nike Tech",
    price: 110,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Pantaloni",
    image: "https://media.finishline.com/i/finishline/FD3287_010_M1?$default$&w=671&&h=671&bg=rgb(237,237,237)",
    time: "30 min",
    storeName: "Nike",
  },
  {
    id: "6",
    name: "New Balance 574",
    price: 90,
    category: "Scarpe",
    image: "https://images.asos-media.com/products/new-balance-574-sneakers-nere/201068493-1-black?$n_640w$&wid=513&fit=constrain",
    time: "30 min",
    storeName: "New Balance",
  },
];

export const products3: Product[] = [
  {
    id: "7",
    name: "Puma Suede",
    price: 75,
    category: "Scarpe",
    image: "https://www.aw-lab.com/dw/image/v2/BJTH_PRD/on/demandware.static/-/Sites-awlab-master-catalog/default/dw4ca9bf9e/images/large/4036749_1.jpg?sw=843",
    time: "30 min",
    storeName: "Puma",
  },
  {
    id: "8",
    name: "Reebok Classic",
    price: 80,
    category: "Scarpe",
    image: "https://images.asos-media.com/products/reebok-scarpe-da-ginnastica-in-pelle-bianco-classico/202167071-1-white?$n_640w$&wid=513&fit=constrain",
    time: "30 min",
    storeName: "Reebok",
  },
  {
    id: "9",
    name: "Asics Gel Lyte",
    price: 100,
    category: "Scarpe",
    image: "https://images.prom.ua/4644876329_w640_h640_muzhskie-krossovki-asics.jpg",
    time: "30 min",
    storeName: "Asics",
  },
];