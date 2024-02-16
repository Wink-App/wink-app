type PriceProps = {
  children: number;
};

export default function Price({ children }: PriceProps) {
  return children.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}