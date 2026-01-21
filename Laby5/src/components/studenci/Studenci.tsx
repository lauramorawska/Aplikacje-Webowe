interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}
const Studenci = () => {
  const Students: Student[] = [
    { imie: "Jan", nazwisko: "Kowalski", rocznik: 2020 },
    { imie: "Katarzyna", nazwisko: "Nowak", rocznik: 2021 },
    { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2019 },
  ];
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
          {Students.map((student) => (
            <tr>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studenci;
