type Counter = {
  id: number;
  name: string;
  value: number;
};

type Props = {
  counter: Counter;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

export default function CounterItem({
  counter,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <span>{counter.name}</span>
      <span>{counter.value}</span>

      <button onClick={() => onDecrement(counter.id)}>-</button>
      <button onClick={() => onIncrement(counter.id)}>+</button>
    </div>
  );
}
