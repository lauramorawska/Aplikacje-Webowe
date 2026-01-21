type ProduktProps = {
  nazwa: string;
};

export default function Produkt(props: ProduktProps) {
  return <p>{props.nazwa}</p>;
}
