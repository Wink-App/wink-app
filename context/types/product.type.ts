// TODO: Redefine this temporary Product type

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  time: string;
  storeName: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Nike Tech Fleece",
    price: 110,
    image: "https://i8.amplience.net/i/jpl/jd_668346_a?qlt=92",
    time: "30 min",
    storeName: "Nike",
  },
  {
    id: "2",
    name: "Adidas Superstar",
    price: 90,
    image: "https://i.ebayimg.com/images/g/sCwAAOSw7HFkicXr/s-l1200.webp",
    time: "30 min",
    storeName: "Adidas",
  },
  {
    id: "3",
    name: "Vans Old Skool",
    price: 80,
    image: "https://images.vans.com/is/image/VansEU/VN0005UB1KP-HERO?$PDP-FULL-IMAGE$",
    time: "30 min",
    storeName: "Vans",
  },
  {
    id: "4",
    name: "Converse Chuck Taylor",
    price: 70,
    image: "https://via.placeholder.com/200",
    time: "30 min",
    storeName: "Converse",
  },
  {
    id: "5",
    name: "Puma Suede",
    price: 75,
    image: "https://via.placeholder.com/200",
    time: "30 min",
    storeName: "Puma",
  }
];