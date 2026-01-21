import React, { useState } from "react";

const Licznik = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);

  return (
    <div>
      <h1>Licznik: {count}</h1>
      <button onClick={increment}>Dodaj</button>
    </div>
  );
};

export default Licznik;
