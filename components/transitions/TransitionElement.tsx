import { MotiView } from "moti";

type Prop = {
  children: JSX.Element;
};

export default function TransitionElement({ children }: Prop) {
  return (
    <MotiView
      from={{ translateY: 10, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 200 }}>
      {children}
    </MotiView>
  );
}
