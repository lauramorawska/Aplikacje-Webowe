import "./App.css";
import { Koszyk } from "./components/koszyk/Koszyk";
import Produkt from "./components/koszyk/Produkt";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
import Licznik from "./components/liczniki/Licznik";
import NowyLicznik from "./components/liczniki/NowyLicznik";
import Formularz from "./components/formularze/Formularz";
import Haslo from "./components/formularze/Haslo";
import Logowanie from "./components/formularze/Logowanie";
import Ternary from "./components/inne/Ternary";
import Aktualizacja from "./components/inne/Aktualizacja";
import Studenci from "./components/studenci/Studenci";
import StudentManager from "./components/studenci/StudentManager";
import LicznikEfekty from "./components/efekty/LicznikEfekty";
import Tytul from "./components/efekty/Tytul";
import Odliczanie from "./components/efekty/Odliczanie";
import LicznikLS from "./components/zad8/LicznikLS";

function App() {
  return (
    <>
      <h2>Koszyk1</h2>
      <Koszyk>
        <Produkt nazwa="Jablko"></Produkt>
        <Produkt nazwa="Gruszka"></Produkt>
        <Produkt nazwa="Pomarancza"></Produkt>
        <Produkt nazwa="Cytryna"></Produkt>
        <Produkt nazwa="Śliwka"></Produkt>
      </Koszyk>

      <h2>NowyKoszyk</h2>
      <NowyKoszyk></NowyKoszyk>

      <Licznik></Licznik>
      <NowyLicznik></NowyLicznik>
      <Formularz></Formularz>
      <Haslo></Haslo>
      <Logowanie></Logowanie>
      <Ternary></Ternary>
      <Aktualizacja></Aktualizacja>
      <Studenci></Studenci>
      <StudentManager></StudentManager>
      <LicznikEfekty></LicznikEfekty>
      <Tytul></Tytul>
      <Odliczanie></Odliczanie>
      <LicznikLS></LicznikLS>
    </>
  );
}

export default App;
