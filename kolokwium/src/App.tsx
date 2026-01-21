import { useEffect, useState } from "react";
import AddCounter from "./components/AddCounter";
import CounterList from "./components/CounterList";

type Counter = {
  id: number;
  name: string;
  value: number;
};

const STORAGE_KEY = "counters";

export default function App() {
  const [counters, setCounters] = useState<Counter[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Counter[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  }, [counters]);

  useEffect(() => {
    const sum = counters.reduce((acc, c) => acc + c.value, 0);
    console.log("Suma wszystkich liczników:", sum);
  }, [counters]);

  const addCounter = (name: string) => {
    const newCounter: Counter = {
      id: Date.now(),
      name,
      value: 0,
    };
    setCounters((prev) => [...prev, newCounter]);
  };

  const increment = (id: number) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: c.value + 1 } : c))
    );
  };

  const decrement = (id: number) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: c.value - 1 } : c))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Wielokrotny licznik</h1>
      <AddCounter onAdd={addCounter} />
      <CounterList
        counters={counters}
        onIncrement={increment}
        onDecrement={decrement}
      />
    </div>
  );
}
