import type { ReactNode } from "react";

type KoszykProps = {
  children: ReactNode;
};

export function Koszyk(props: KoszykProps) {
  return <div>{props.children}</div>;
}
