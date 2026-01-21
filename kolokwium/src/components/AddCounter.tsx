import { useState } from "react";

type Props = {
  onAdd: (name: string) => void;
};

export default function AddCounter({ onAdd }: Props) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nazwa licznika..."
      />
      <button onClick={handleAdd}>Dodaj</button>
    </div>
  );
}
