import CounterItem from "./CounterItem";

type Counter = {
  id: number;
  name: string;
  value: number;
};

type Props = {
  counters: Counter[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

export default function CounterList({
  counters,
  onIncrement,
  onDecrement,
}: Props) {
  if (counters.length === 0) {
    return <p>Brak licznikow</p>;
  }

  return (
    <div>
      {counters.map((counter) => (
        <CounterItem
          key={counter.id}
          counter={counter}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </div>
  );
}
