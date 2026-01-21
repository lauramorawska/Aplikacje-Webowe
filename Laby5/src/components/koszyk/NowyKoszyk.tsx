import Produkt from "./Produkt";

export default function NowyKoszyk() {
  const produkty: string[] = [
    "Jablko",
    "Truskawka",
    "Malina",
    "Borowka",
    "Jeżyna",
  ];
  return (
    <>
      <ul>
        {produkty.map((produkt) => (
          <li key={produkt}>
            <Produkt nazwa={produkt} />
          </li>
        ))}
      </ul>
    </>
  );
}
