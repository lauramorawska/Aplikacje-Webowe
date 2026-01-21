import React, { useEffect, useState } from "react";

const Licznik = () => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("licznikLS");
    return saved ? Number(saved) : 0;
  });
  const increment = () => setCount((prev) => prev + 1);

  useEffect(() => {
    localStorage.setItem("licznikLS", count.toString());
  }, [count]);
  return (
    <div>
      <h1>Licznik: {count}</h1>
      <button onClick={increment}>Dodaj</button>
    </div>
  );
};

export default Licznik;
