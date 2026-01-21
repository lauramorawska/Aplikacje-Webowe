import React, { useState } from "react";

const Aktualizacja = () => {
  const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });
  function akt() {
    setProdukt((prev) => ({ ...prev, cena: 100 }));
  }
  return (
    <div>
      Aktualnie {produkt.nazwa} kosztuje {produkt.cena} zł
      <button onClick={akt}>Zmień cenę</button>
    </div>
  );
};

export default Aktualizacja;
