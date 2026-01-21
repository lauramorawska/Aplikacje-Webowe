import React, { useEffect, useState } from "react";

const LicznikEfekty = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);

  useEffect(() => {
    console.log("Hello world");
  }, []);

  useEffect(() => {
    console.log("Licznik zwiększył się do:", count);
  }, [count]);

  return (
    <div>
      <h1>LicznikEfekty: {count}</h1>
      <button onClick={increment}>Dodaj</button>
    </div>
  );
};

export default LicznikEfekty;
