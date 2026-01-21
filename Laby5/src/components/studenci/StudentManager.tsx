import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

const Students: Student[] = [
  { imie: "Jan", nazwisko: "Kowalski", rocznik: 2020 },
  { imie: "Katarzyna", nazwisko: "Nowak", rocznik: 2021 },
  { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2019 },
];

const StudentManager = () => {
  function handleAddStudent(newStudent: Student) {
    setStudent((prevStudents) => [...prevStudents, newStudent]);
  }

  const [student, setStudent] = useState(Students);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {student.map((student) => (
            <tr>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dodawanie onAdd={handleAddStudent} />
    </div>
  );
};

export default StudentManager;
