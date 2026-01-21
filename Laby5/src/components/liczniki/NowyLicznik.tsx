import React, { useState } from "react";
import Przycisk from "./Przycisk";

const NowyLicznik = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);

  return (
    <div>
      <h1>Nowy Licznik: {count}</h1>
      <Przycisk onClick={increment} />
    </div>
  );
};

export default NowyLicznik;
