import React, { useState } from "react";

export interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

type DodawanieProps = {
  onAdd: (student: Student) => void;
};

const Dodawanie = ({ onAdd }: DodawanieProps) => {
  const [StudentDane, setStudentDane] = useState({
    name: "",
    surname: "",
    year: "",
  });

  function dodajStudenta() {
    const nowyStudent: Student = {
      imie: StudentDane.name,
      nazwisko: StudentDane.surname,
      rocznik: parseInt(StudentDane.year),
    };
    onAdd(nowyStudent);
    setStudentDane({ name: "", surname: "", year: "" });
  }

  return (
    <div>
      <h3>Imię:</h3>
      <input
        value={StudentDane.name}
        onChange={(e) =>
          setStudentDane({ ...StudentDane, name: e.target.value })
        }
      />
      <h3>Nazwisko:</h3>
      <input
        value={StudentDane.surname}
        onChange={(e) =>
          setStudentDane({ ...StudentDane, surname: e.target.value })
        }
      />
      <h3>Rocznik:</h3>
      <input
        value={StudentDane.year}
        onChange={(e) =>
          setStudentDane({ ...StudentDane, year: e.target.value })
        }
      />
      <button onClick={dodajStudenta}>Dodaj studenta</button>
    </div>
  );
};

export default Dodawanie;
